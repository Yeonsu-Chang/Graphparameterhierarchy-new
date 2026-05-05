(function () {
  const data = window.GRAPH_CLASS_EXAMPLE;

  if (!data) throw new Error("GRAPH_CLASS_EXAMPLE is missing. Check data.js.");

  const ui = {
    title: document.getElementById("page-title"),
    search: document.getElementById("class-search"),
    classList: document.getElementById("class-list"),
    selectedGroup: document.getElementById("selected-group"),
    selectedTitle: document.getElementById("selected-title"),
    selectedSummary: document.getElementById("selected-summary"),
    relationViewTitle: document.getElementById("relation-view-title"),
    equivalentList: document.getElementById("equivalent-list"),
    subclassList: document.getElementById("subclass-list"),
    superclassList: document.getElementById("superclass-list"),
    equivalentCount: document.getElementById("equivalent-count"),
    subclassCount: document.getElementById("subclass-count"),
    superclassCount: document.getElementById("superclass-count"),
    fit: document.getElementById("fit-graph"),
    zoomIn: document.getElementById("zoom-in"),
    zoomOut: document.getElementById("zoom-out"),
    graphViewButtons: Array.from(document.querySelectorAll(".graph-view-button")),
    graphCount: document.getElementById("graph-count"),
    graph: document.getElementById("class-graph")
  };

  function toId(name) {
    const normalizedLabel = String(name).trim().toLowerCase().replace(/^bounded\s+/, "");
    const aliases = {
      "merge-width": "𝑟-merge-width",
      "flip-width": "𝑟-flip-width"
    };

    return (aliases[normalizedLabel] || normalizedLabel)
      .replace(/[^a-z0-9가-힣α-ω∞𝑐𝑟ℎ]+/gi, "-")
      .replace(/^-+|-+$/g, "");
  }

  function isDirectedParameter(label) {
    return [
      "cycle rank",
      "dag-depth",
      "dag-width",
      "directed path-width",
      "directed tree-width",
      "kelly-width",
      "strong (∞, →)-coloring number",
      "weak (∞, →)-coloring number"
    ].includes(String(label).trim().toLowerCase());
  }

  function parameterClassLabel(label) {
    return String(label).startsWith("bounded ") ? label : `bounded ${label}`;
  }

  function displayLabel(label) {
    return String(label)
      .replace(/\\cap/g, "⋂")
      .replace(/\\cup/g, "∪")
      .replace(/\\Delta/g, "Δ")
      .replace(/\\alpha/g, "α")
      .replace(/\\chi/g, "𝜒")
      .replace(/\\infty/g, "∞")
      .replace(/\\to/g, "→")
      .replace(/\\rightarrow/g, "→")
      .replace(/\s+/g, " ")
      .replace(/Polynomially 𝜒 - bounded/g, "Polynomially\n𝜒 - bounded")
      .trim();
  }

  function setDisplayLabel(element, label) {
    const parts = displayLabel(label).split("∞");
    element.replaceChildren();
    parts.forEach((part, index) => {
      if (part) element.appendChild(document.createTextNode(part));
      if (index < parts.length - 1) {
        const symbol = document.createElement("span");
        symbol.className = "math-infinity";
        symbol.textContent = "∞";
        element.appendChild(symbol);
      }
    });
  }

  function collectGraph() {
    const nodes = new Map();
    const edges = [];
    const edgeKeys = new Set();

    function addNode(label, group) {
      const normalizedGroup = group || "Unlabeled classes";
      const id = toId(label);
      const existing = nodes.get(id);
      if (!existing) {
        nodes.set(id, { id, label, group: normalizedGroup, groups: [normalizedGroup] });
      } else {
        if (!existing.label.startsWith("bounded ") && label.startsWith("bounded ")) existing.label = label;
        if (normalizedGroup !== "Unlabeled classes") {
          existing.groups = existing.groups.filter((item) => item !== "Unlabeled classes");
        }
        if (
          normalizedGroup === "Unlabeled classes" &&
          existing.groups.some((item) => item !== "Unlabeled classes")
        ) {
          return id;
        }
        if (!existing.groups.includes(normalizedGroup)) existing.groups.push(normalizedGroup);
        if (
          existing.group === "Unlabeled classes" ||
          (existing.group === "Parameter classes" && normalizedGroup !== "Parameter classes")
        ) {
          existing.group = normalizedGroup;
        }
      }
      return id;
    }

    function addEdge(edge) {
      if (edge.source === edge.target) return;
      const key = `${edge.source}::${edge.target}::${edge.type}`;
      if (edgeKeys.has(key)) return;
      edgeKeys.add(key);
      edges.push({ ...edge, id: edge.id || `edge-${edgeKeys.size}` });
    }

    if (data.classes || data.classLabels || data.relations) {
      (data.classes || []).forEach((label) => addNode(label, "Unlabeled classes"));
      (data.classLabels || []).forEach((group) => {
        group.classes.forEach((label) => addNode(label, group.label));
      });
      (data.relations || []).forEach((edge, index) => {
        if (isDirectedParameter(edge.source) || isDirectedParameter(edge.target)) return;
        addEdge({
          id: `relation-${index}`,
          source: addNode(edge.source, "Unlabeled classes"),
          target: addNode(edge.target, "Unlabeled classes"),
          type: edge.type === "equivalent" ? "equivalent" : "subset"
        });
      });
    } else {
      const hierarchy = data.generalGraphClassHierarchy || { groups: [], inclusions: [] };
      hierarchy.groups.forEach((group) => {
        group.classes.forEach((label) => addNode(label, group.label));
      });
      hierarchy.inclusions.forEach((edge, index) => {
        const source = addNode(edge.source, "General graph classes");
        const target = addNode(edge.target, "General graph classes");
        addEdge({ id: `general-${index}`, source, target, type: "subset" });
      });

      const parameterClassGroup = data.parameterClasses || {
        label: "Parameter classes",
        classes: data.parameterLabels || []
      };
      (parameterClassGroup.classes || []).forEach((label) => {
        if (!isDirectedParameter(label)) addNode(parameterClassLabel(label), parameterClassGroup.label);
      });

      (data.compoundParameterClasses || []).forEach((group) => {
        group.classes.forEach((label) => addNode(label, group.label));
      });

      (data.parameterRelations || []).forEach((edge, index) => {
        if (isDirectedParameter(edge.source) || isDirectedParameter(edge.target)) return;
        addEdge({
          id: `parameter-${index}`,
          source: addNode(parameterClassLabel(edge.source), "Parameter classes"),
          target: addNode(parameterClassLabel(edge.target), "Parameter classes"),
          type: edge.type === "equivalent" ? "equivalent" : "subset"
        });
      });
    }

    return {
      nodes: Array.from(nodes.values()).sort((a, b) => a.label.localeCompare(b.label, "en")),
      edges: removeRedundantSubsetEdges(edges)
    };
  }

  /*
   * Legacy data support above still reads parameterLabels / parameterRelations.
   * New data should use classes / classLabels / relations in data.js.
   */
  function removeRedundantSubsetEdges(edges) {
    const subsetEdges = edges.filter((edge) => edge.type !== "equivalent");

    function hasAlternatePath(source, target, skippedEdgeId) {
      const queue = [source];
      const visited = new Set([source]);
      while (queue.length) {
        const current = queue.shift();
        for (const edge of subsetEdges) {
          if (edge.id === skippedEdgeId || edge.source !== current) continue;
          if (edge.target === target) return true;
          if (!visited.has(edge.target)) {
            visited.add(edge.target);
            queue.push(edge.target);
          }
        }
      }
      return false;
    }

    return edges.filter((edge) => edge.type === "equivalent" || !hasAlternatePath(edge.source, edge.target, edge.id));
  }

  const graphData = collectGraph();
  const nodeById = new Map(graphData.nodes.map((node) => [node.id, node]));
  const classNames = graphData.nodes.map((node) => node.label);
  const preferredEquivalentLabels = [
    "bounded clique-width",
    "bounded tree-width",
    "bounded tree-depth",
    "bounded path-width",
    "bounded expansion",
    "Nowhere dense",
    "bounded shrub-depth",
    "bounded degeneracy",
    "bounded vertex cover number",
    "bounded cut-width",
    "bounded linear clique-width",
    "bounded track number",
    "bounded tree-partition-width"
  ];
  const preferredEquivalentIds = new Map(preferredEquivalentLabels.map((label, index) => [toId(label), index]));
  let selectedId =
    graphData.nodes.find((node) => node.label.toLowerCase() === "monadically dependent")?.id ||
    graphData.nodes[0].id;
  let localGraphView = "all";
  let cy;

  function subsetEdges() {
    return graphData.edges.filter((edge) => edge.type !== "equivalent");
  }

  function equivalentEdges() {
    return graphData.edges.filter((edge) => edge.type === "equivalent");
  }

  function directSubclasses(id) {
    return subsetEdges().filter((edge) => edge.target === id).map((edge) => edge.source);
  }

  function directSubclassesFor(ids) {
    const idSet = new Set(ids);
    return subsetEdges().filter((edge) => idSet.has(edge.target)).map((edge) => edge.source);
  }

  function directSuperclasses(id) {
    return subsetEdges().filter((edge) => edge.source === id).map((edge) => edge.target);
  }

  function directSuperclassesFor(ids) {
    const idSet = new Set(ids);
    return subsetEdges().filter((edge) => idSet.has(edge.source)).map((edge) => edge.target);
  }

  function equivalentClasses(id) {
    const queue = [id];
    const visited = new Set([id]);

    while (queue.length) {
      const current = queue.shift();
      equivalentEdges().forEach((edge) => {
        if (edge.source !== current && edge.target !== current) return;
        const next = edge.source === current ? edge.target : edge.source;
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      });
    }

    visited.delete(id);
    return Array.from(visited);
  }

  function equivalentComponentIds(id) {
    return [id, ...equivalentClasses(id)];
  }

  function reachable(startId, direction) {
    return reachableFromMany([startId], direction);
  }

  function reachableFromMany(startIds, direction) {
    const queue = [...startIds];
    const visited = new Set(startIds);
    const result = [];

    while (queue.length) {
      const current = queue.shift();
      const currentRoots = new Set(equivalentComponentIds(current));
      subsetEdges().forEach((edge) => {
        const matches = direction === "sub" ? currentRoots.has(edge.target) : currentRoots.has(edge.source);
        if (!matches) return;
        const next = direction === "sub" ? edge.source : edge.target;
        const nextComponent = equivalentComponentIds(next);
        if (nextComponent.some((componentId) => !visited.has(componentId))) {
          result.push(next);
          nextComponent.forEach((componentId) => {
            if (!visited.has(componentId)) {
              visited.add(componentId);
              queue.push(componentId);
            }
          });
        }
      });
    }

    return result;
  }

  function uniqueSorted(ids) {
    return Array.from(new Set(ids))
      .filter((id) => nodeById.has(id))
      .sort((a, b) => nodeById.get(a).label.localeCompare(nodeById.get(b).label, "en"));
  }

  function canonicalEquivalentId(id) {
    const component = uniqueSorted([id, ...equivalentClasses(id)]);
    if (component.length <= 1) return id;

    return component.sort((a, b) => {
      const preferredA = preferredEquivalentIds.has(a) ? preferredEquivalentIds.get(a) : 1000;
      const preferredB = preferredEquivalentIds.has(b) ? preferredEquivalentIds.get(b) : 1000;
      const comboA = nodeById.get(a).label.includes("\\cap") ? 1 : 0;
      const comboB = nodeById.get(b).label.includes("\\cap") ? 1 : 0;
      return (
        preferredA - preferredB ||
        comboA - comboB ||
        nodeById.get(a).label.localeCompare(nodeById.get(b).label, "en")
      );
    })[0];
  }

  function representativeForView(id, selected, relations) {
    const selectedRoots = new Set(relations.relationRoots || [selected]);
    if (selectedRoots.has(id)) return selected;
    return canonicalEquivalentId(id);
  }

  function representativeIdsForView(ids, selected, relations) {
    return uniqueSorted(ids.map((id) => representativeForView(id, selected, relations)));
  }

  function renderClassList() {
    const query = ui.search.value.trim().toLowerCase();
    const matches = graphData.nodes
      .filter((node) => !query || node.label.toLowerCase().includes(query))
      .slice(0, 180);

    ui.classList.innerHTML = "";
    matches.forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = node.id === selectedId ? "active" : "";
      setDisplayLabel(button, node.label);
      button.addEventListener("click", () => selectClass(node.id));
      ui.classList.appendChild(button);
    });
  }

  function renderRelationList(container, countEl, ids) {
    const sorted = uniqueSorted(ids);
    countEl.textContent = `${sorted.length}`;
    container.innerHTML = "";
    container.classList.toggle("empty", sorted.length === 0);
    if (!sorted.length) {
      container.textContent = "No recorded classes.";
      return;
    }

    sorted.forEach((id) => {
      const button = document.createElement("button");
      button.type = "button";
      setDisplayLabel(button, nodeById.get(id).label);
      button.addEventListener("click", () => selectClass(id));
      container.appendChild(button);
    });
  }

  function selectClass(id) {
    if (!nodeById.has(id)) return;
    selectedId = id;
    const selected = nodeById.get(id);
    const equivalents = equivalentClasses(id);
    const relationRoots = [id, ...equivalents];
    const subclasses = reachableFromMany(relationRoots, "sub").filter((item) => !relationRoots.includes(item));
    const superclasses = reachableFromMany(relationRoots, "super").filter((item) => !relationRoots.includes(item));
    const neighbors = uniqueSorted([
      ...directSubclassesFor(relationRoots),
      ...directSuperclassesFor(relationRoots)
    ]).filter((item) => !relationRoots.includes(item));

    ui.selectedGroup.textContent = groupLabel(selected);
    setDisplayLabel(ui.selectedTitle, selected.label);
    setDisplayLabel(ui.relationViewTitle, selected.label);
    ui.selectedSummary.textContent = relationSummary(equivalents, subclasses, superclasses);
    renderRelationList(ui.equivalentList, ui.equivalentCount, equivalents);
    renderRelationList(ui.subclassList, ui.subclassCount, subclasses);
    renderRelationList(ui.superclassList, ui.superclassCount, superclasses);
    renderClassList();
    renderLocalGraph(id, { relationRoots, equivalents, subclasses, superclasses, neighbors });
  }

  function relationSummary(equivalents, subclasses, superclasses) {
    return [
      `${equivalents.length} equivalent classes`,
      `${subclasses.length} subclasses`,
      `${superclasses.length} superclasses`
    ].join(" · ");
  }

  function groupClass(group) {
    return `group-${toId(group || "other")}`;
  }

  function groupLabel(node) {
    return (node.groups || [node.group]).join(" · ");
  }

  function directionalTwoHopLocalIds(id, relations) {
    const selectedRoots = new Set(relations.relationRoots || [id]);
    const equivalentSet = new Set(relations.equivalents || []);
    const visited = new Set([id]);
    const directIn = new Set();
    const directOut = new Set();

    graphData.edges.forEach((edge) => {
      if (edge.type === "equivalent") return;
      if (selectedRoots.has(edge.source) && !equivalentSet.has(edge.target)) directOut.add(edge.target);
      if (selectedRoots.has(edge.target) && !equivalentSet.has(edge.source)) directIn.add(edge.source);
    });

    directIn.forEach((nodeId) => visited.add(nodeId));
    directOut.forEach((nodeId) => visited.add(nodeId));

    const directInRoots = new Set(Array.from(directIn).flatMap((nodeId) => equivalentComponentIds(nodeId)));
    const directOutRoots = new Set(Array.from(directOut).flatMap((nodeId) => equivalentComponentIds(nodeId)));

    graphData.edges.forEach((edge) => {
      if (edge.type === "equivalent") return;
      if (directOutRoots.has(edge.source) && !equivalentSet.has(edge.target)) visited.add(edge.target);
      if (directInRoots.has(edge.target) && !equivalentSet.has(edge.source)) visited.add(edge.source);
    });

    return representativeIdsForView(Array.from(visited), id, relations);
  }

  function localNodeIds(id, relations) {
    if (localGraphView === "equivalent") {
      return uniqueSorted([id, ...relations.equivalents]);
    }

    const subclassIds = [
      id,
      ...directSubclassesFor(relations.relationRoots),
      ...(localGraphView === "subclasses" ? relations.subclasses : relations.subclasses.slice(0, 16))
    ];
    const superclassIds = [
      id,
      ...directSuperclassesFor(relations.relationRoots),
      ...(localGraphView === "superclasses" ? relations.superclasses : relations.superclasses.slice(0, 16))
    ];

    if (localGraphView === "subclasses") return representativeIdsForView(subclassIds, id, relations);
    if (localGraphView === "superclasses") return representativeIdsForView(superclassIds, id, relations);

    return directionalTwoHopLocalIds(id, relations);
  }

  function renderLocalGraph(id, relations) {
    const ids = localNodeIds(id, relations);
    const idSet = new Set(ids);
    const edgeTypes = localGraphView === "equivalent" ? ["equivalent"] : ["subset"];
    const localEdges = localGraphEdges(id, idSet, edgeTypes, relations);
    const elements = [
      ...ids.map((nodeId) => ({
        data: {
          id: nodeId,
          label: displayLabel(nodeById.get(nodeId).label),
          group: groupLabel(nodeById.get(nodeId))
        },
        classes: [
          groupClass(nodeById.get(nodeId).group),
          nodeId === id ? "selected" : ""
        ].join(" ")
      })),
      ...localEdges.map((edge) => ({
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.type
        },
        classes: edge.type
      }))
    ];

    cy.elements().remove();
    cy.add(elements);
    cy.layout({
      name: "dagre",
      rankDir: localGraphView === "equivalent" ? "LR" : "BT",
      nodeSep: localGraphView === "equivalent" ? 70 : 42,
      edgeSep: 12,
      rankSep: localGraphView === "equivalent" ? 120 : 94,
      padding: 24,
      animate: false
    }).run();
    setTimeout(fitGraph, 80);
  }

  function localGraphEdges(selected, idSet, edgeTypes, relations) {
    const edges = [];
    const seen = new Set();
    const roots = new Set(relations.relationRoots || [selected]);
    const equivalentSet = new Set(relations.equivalents || []);

    function add(edge) {
      if (!idSet.has(edge.source) || !idSet.has(edge.target)) return;
      if (!edgeTypes.includes(edge.type)) return;
      if (edge.source === edge.target) return;
      const key = `${edge.source}::${edge.target}::${edge.type}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ ...edge, id: edge.id || `local-${seen.size}` });
    }

    graphData.edges.forEach((edge) => {
      if (edge.type === "equivalent") {
        add(edge);
        return;
      }

      const source = representativeForView(edge.source, selected, relations);
      const target = representativeForView(edge.target, selected, relations);
      if (equivalentSet.has(source) || equivalentSet.has(target)) return;
      add({ ...edge, id: `projected-${edge.id}-${source}-${target}`, source, target });
    });

    return removeRedundantLocalSubsetEdges(edges);
  }

  function removeRedundantLocalSubsetEdges(edges) {
    const subset = edges.filter((edge) => edge.type !== "equivalent");

    function hasAlternatePath(source, target, skippedId) {
      const queue = [source];
      const visited = new Set([source]);

      while (queue.length) {
        const current = queue.shift();
        for (const edge of subset) {
          if (edge.id === skippedId || edge.source !== current) continue;
          if (edge.target === target) return true;
          if (!visited.has(edge.target)) {
            visited.add(edge.target);
            queue.push(edge.target);
          }
        }
      }

      return false;
    }

    return edges.filter((edge) => {
      if (edge.type === "equivalent") return true;
      return !hasAlternatePath(edge.source, edge.target, edge.id);
    });
  }

  function initGraph() {
    cy = cytoscape({
      container: ui.graph,
      elements: [],
      userZoomingEnabled: false,
      minZoom: 0.18,
      maxZoom: 2.4,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#ffffff",
            "border-width": 2,
            "border-color": "#94a3b8",
            "shape": "round-rectangle",
            "width": "label",
            "height": 38,
            "padding": "14px",
            "label": "data(label)",
            "font-size": 13,
            "font-weight": 800,
            "color": "#18202f",
            "text-valign": "center",
            "text-halign": "center",
            "text-wrap": "wrap",
            "text-max-width": 150,
            "overlay-opacity": 0,
            "z-index": 10
          }
        },
        { selector: ".group-fo-ideal", style: { "background-color": "#fff1f4", "border-color": "#e11d48" } },
        { selector: ".group-monadically-stable", style: { "background-color": "#f0fdfa", "border-color": "#0f766e" } },
        { selector: ".group-structural", style: { "background-color": "#fff7ed", "border-color": "#f97316" } },
        { selector: ".group-weakly-sparse", style: { "background-color": "#eff6ff", "border-color": "#2563eb" } },
        { selector: ".group-basic-graph-classes", style: { "background-color": "#f5f3ff", "border-color": "#7c3aed" } },
        { selector: ".group-coloring-classes", style: { "background-color": "#fdf2f8", "border-color": "#db2777" } },
        { selector: ".group-combined-parameter-classes", style: { "background-color": "#ecfeff", "border-color": "#0891b2" } },
        { selector: ".group-parameter-classes", style: { "background-color": "#f8fafc", "border-color": "#64748b" } },
        { selector: ".group-general-graph-classes", style: { "background-color": "#fefce8", "border-color": "#ca8a04" } },
        {
          selector: "node.selected",
          style: {
            "border-width": 5,
            "border-color": "#dc2626",
            "background-color": "#fff7ed"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "width": 2,
            "line-color": "#98a2b3",
            "target-arrow-color": "#98a2b3",
            "target-arrow-shape": "triangle",
            "target-distance-from-node": 3,
            "source-distance-from-node": 2,
            "arrow-scale": 0.9,
            "overlay-opacity": 0,
            "z-index": 1
          }
        },
        {
          selector: "edge.equivalent",
          style: {
            "line-style": "dashed",
            "line-color": "#7c3aed",
            "target-arrow-color": "#7c3aed"
          }
        }
      ]
    });

    cy.on("tap", "node", (event) => selectClass(event.target.id()));
  }

  function fitGraph() {
    if (!cy || !cy.elements().length) return;
    cy.fit(cy.elements(), 48);
    cy.center();
  }

  function zoomGraph(factor) {
    if (!cy) return;
    const level = Math.max(cy.minZoom(), Math.min(cy.maxZoom(), cy.zoom() * factor));
    cy.animate({
      zoom: {
        level,
        renderedPosition: {
          x: ui.graph.clientWidth / 2,
          y: ui.graph.clientHeight / 2
        }
      },
      duration: 120
    });
  }

  ui.title.textContent = "Graph Class Map";
  ui.graphCount.textContent = `${graphData.nodes.length} classes / ${graphData.edges.length} relations`;

  initGraph();
  renderClassList();
  selectClass(selectedId);

  ui.search.addEventListener("input", renderClassList);
  ui.fit.addEventListener("click", fitGraph);
  ui.zoomIn.addEventListener("click", () => zoomGraph(1.18));
  ui.zoomOut.addEventListener("click", () => zoomGraph(1 / 1.18));
  ui.graphViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localGraphView = button.dataset.view;
      ui.graphViewButtons.forEach((item) => item.classList.toggle("active", item === button));
      selectClass(selectedId);
    });
  });
})();
