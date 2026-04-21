(function () {
  const data = window.GRAPH_DATA;

  if (!data) {
    throw new Error("GRAPH_DATA is missing. Check graph-data.js.");
  }

  cytoscape.use(window.cytoscapeDagre);

  const ui = {
    pageTitle: document.getElementById("page-title"),
    panelTitle: document.getElementById("panel-title"),
    homepageLink: document.getElementById("homepage-link"),
    highlightLabel: document.getElementById("highlight-label"),
    edgeHL: document.getElementById("edgeHL"),
    nodePanel: document.getElementById("node-panel"),
    nodeListEl: document.getElementById("node-panel-list"),
    nodeCount: document.getElementById("node-count"),
    nodeFilter: document.getElementById("node-filter"),
    clearNodeFilterButton: document.getElementById("clear-node-filter"),
    nodeFilterMeta: document.getElementById("node-filter-meta"),
    selectedNodeLabel: document.getElementById("selected-node-label"),
    fitButton: document.getElementById("fit"),
    resetButton: document.getElementById("reset"),
    togglePanelButton: document.getElementById("toggle-panel"),
    toggleDefinitionButton: document.getElementById("toggle-definition"),
    togglePathFinderButton: document.getElementById("toggle-path-finder"),
    definitionPanel: document.getElementById("definition-panel"),
    pathPanel: document.getElementById("path-panel"),
    closeNodePanelButton: document.getElementById("close-node-panel"),
    closeDefinitionButton: document.getElementById("close-definition"),
    closePathFinderButton: document.getElementById("close-path-finder"),
    sidePanels: document.getElementById("side-panels"),
    mobileGraphHint: document.getElementById("mobile-graph-hint"),
    detailTitle: document.getElementById("detail-title"),
    detailSummary: document.getElementById("detail-summary"),
    incomingList: document.getElementById("incoming-list"),
    outgoingList: document.getElementById("outgoing-list"),
    equivalentList: document.getElementById("equivalent-list"),
    pathFrom: document.getElementById("path-from"),
    pathTo: document.getElementById("path-to"),
    nodeOptions: document.getElementById("node-options"),
    findPathButton: document.getElementById("find-path"),
    clearPathButton: document.getElementById("clear-path"),
    pathResult: document.getElementById("path-result"),
  };

  const site = data.site || {};
  const graph = data.graph || {};
  const settings = data.settings || {};
  const mobileMedia = window.matchMedia("(max-width: 720px)");

  ui.pageTitle.textContent = site.title || "Graph Parameter Hierarchy";
  ui.panelTitle.textContent = site.panelTitle || "All nodes";
  ui.highlightLabel.textContent = site.highlightLabel || "k-hierarchy";
  ui.homepageLink.textContent = site.homepageLabel || "Homepage";
  ui.homepageLink.href = site.homepageUrl || "#";
  ui.nodeFilter.placeholder = site.filterPlaceholder || "Filter...";
  ui.toggleDefinitionButton.textContent = "Parameter definition";
  ui.togglePathFinderButton.textContent = "Path finder";
  ui.sidePanels.prepend(ui.nodePanel);

  if (site.analyticsId) {
    loadAnalytics(site.analyticsId);
  }

  const toDisplayText = (text) => {
    if (!text) return text;
    return text
      .replace(/<->|<=>/g, "↔")
      .replace(/-->/g, "→")
      .replace(/<-{1,2}/g, "←")
      .replace(/-{1,2}>/g, "→");
  };

  const toId = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const normalEdges = [];
  const biEdgesRaw = [];

  (graph.edges || []).forEach((edge) => {
    if (edge.type === "equivalent") {
      biEdgesRaw.push([edge.source, edge.target]);
      return;
    }

    normalEdges.push({
      data: {
        source: toId(edge.source),
        target: toId(edge.target),
        sLabel: edge.source,
        tLabel: edge.target,
      },
    });
  });

  const labelsInNormal = new Set();
  normalEdges.forEach((edge) => {
    labelsInNormal.add(edge.data.sLabel);
    labelsInNormal.add(edge.data.tLabel);
  });

  const rawLabelById = new Map();
  Array.from(labelsInNormal).forEach((label) => {
    rawLabelById.set(toId(label), label);
  });

  const nodes = Array.from(labelsInNormal).map((label) => ({
    data: { id: toId(label), label: toDisplayText(label) },
  }));

  const biAdj = {};
  biEdgesRaw.forEach(([left, right]) => {
    (biAdj[left] ||= new Set()).add(right);
    (biAdj[right] ||= new Set()).add(left);
  });

  const cy = cytoscape({
    container: document.getElementById("cy"),
    elements: [...nodes, ...normalEdges],
    style: [
      {
        selector: "node",
        style: {
          label: "data(label)",
          "background-color": "#eef4ff",
          "border-color": "#0b63ff",
          "border-width": 1,
          shape: "round-rectangle",
          color: "#111827",
          "font-size": 18,
          "text-valign": "center",
          "text-wrap": "wrap",
          "text-max-width": 340,
          padding: "12px",
          width: "label",
          height: "label",
        },
      },
      { selector: "node.NH_OUT", style: { "border-color": "#1d4ed8", "border-width": 4, "background-color": "#e6efff" } },
      { selector: "node.NH_IN", style: { "border-color": "#15803d", "border-width": 4, "background-color": "#e6f6ea" } },
      { selector: "node.dim", style: { opacity: 0.2 } },
      { selector: "node.hidden", style: { display: "none" } },
      { selector: "node.SEL", style: { "border-color": "#dc2626", "background-color": "#ffe4e6", "border-width": 5 } },
      { selector: "node.path-node", style: { "border-color": "#f97316", "background-color": "#ffedd5", "border-width": 5, opacity: 1 } },
      { selector: "node.path-start", style: { "border-color": "#2563eb", "background-color": "#dbeafe", "border-width": 6, opacity: 1 } },
      { selector: "node.path-end", style: { "border-color": "#7c3aed", "background-color": "#ede9fe", "border-width": 6, opacity: 1 } },
      { selector: "node.path-dim", style: { opacity: 0.12 } },
      {
        selector: "edge",
        style: {
          width: 2.5,
          "line-color": "#9ca3af",
          "target-arrow-color": "#9ca3af",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
        },
      },
      { selector: "edge.dim", style: { opacity: 0.15 } },
      { selector: "edge.hidden", style: { display: "none" } },
      { selector: "edge.EH_OUT", style: { "line-color": "#1d4ed8", "target-arrow-color": "#1d4ed8", width: 6 } },
      { selector: "edge.EH_IN", style: { "line-color": "#15803d", "target-arrow-color": "#15803d", width: 6 } },
      { selector: "edge.path-edge", style: { width: 7, opacity: 1 } },
      { selector: "edge.path-forward", style: { "line-color": "#f97316", "target-arrow-color": "#f97316" } },
      { selector: "edge.path-reverse", style: { "line-color": "#14b8a6", "target-arrow-color": "#14b8a6", "line-style": "dashed" } },
      { selector: "edge.path-dim", style: { opacity: 0.12 } },
    ],
    layout: {
      name: "dagre",
      rankDir: "TB",
      nodeSep: settings.layout?.nodeSep || 54,
      rankSep: settings.layout?.rankSep || 120,
      edgeSep: settings.layout?.edgeSep || 34,
    },
  });

  const ADJ_OUT = new Map();
  const ADJ_IN = new Map();
  const ADJ_UNDIRECTED = new Map();
  let currentNode = null;
  let activePathInput = "from";
  let filteredNodeLabels = [];
  let keyboardNodeIndex = -1;

  function addEdge(u, v) {
    if (!ADJ_OUT.has(u)) ADJ_OUT.set(u, new Set());
    if (!ADJ_IN.has(v)) ADJ_IN.set(v, new Set());
    if (!ADJ_OUT.has(v)) ADJ_OUT.set(v, new Set());
    if (!ADJ_IN.has(u)) ADJ_IN.set(u, new Set());
    if (!ADJ_UNDIRECTED.has(u)) ADJ_UNDIRECTED.set(u, new Set());
    if (!ADJ_UNDIRECTED.has(v)) ADJ_UNDIRECTED.set(v, new Set());

    ADJ_OUT.get(u).add(v);
    ADJ_IN.get(v).add(u);
    ADJ_UNDIRECTED.get(u).add(v);
    ADJ_UNDIRECTED.get(v).add(u);
  }

  normalEdges.forEach((edge) => addEdge(edge.data.source, edge.data.target));

  function isCompactMobile() {
    return mobileMedia.matches;
  }

  function setMobileGraphHint(visible, message) {
    if (!ui.mobileGraphHint) return;
    ui.mobileGraphHint.hidden = !visible;
    if (message) {
      ui.mobileGraphHint.innerHTML = `<p>${message}</p>`;
    }
  }

  function showGraphContent() {
    setMobileGraphHint(false);
  }

  function hideGraphForMobile(message) {
    clearAllHighlights();
    clearPathHighlights();
    cy.nodes().addClass("hidden");
    cy.edges().addClass("hidden");
    setMobileGraphHint(
      true,
      message || "On mobile, use Parameter list or Path finder to show only the relevant part of the graph."
    );
  }

  function bfsDir(rootId, maxDepth, adjacency) {
    const dist = new Map([[rootId, 0]]);
    const queue = [rootId];

    while (queue.length) {
      const current = queue.shift();
      const depth = dist.get(current);
      if (depth === maxDepth) continue;

      const neighbors = adjacency.get(current) || new Set();
      neighbors.forEach((neighbor) => {
        if (!dist.has(neighbor)) {
          dist.set(neighbor, depth + 1);
          queue.push(neighbor);
        }
      });
    }

    return new Set(dist.keys());
  }

  function clearEdgeHighlights() {
    cy.edges().removeClass("EH_OUT EH_IN dim");
  }

  function clearNodeHighlights() {
    cy.nodes().removeClass("NH_OUT NH_IN dim");
  }

  function clearAllHighlights() {
    clearEdgeHighlights();
    clearNodeHighlights();
  }

  function showFullGraph(options = {}) {
    const { refit = false } = options;

    if (isCompactMobile()) {
      hideGraphForMobile();
      if (refit) {
        cy.resize();
      }
      return;
    }

    cy.nodes().removeClass("hidden");
    cy.edges().removeClass("hidden");
    clearAllHighlights();
    showGraphContent();

    if (refit) {
      restoreDefaultLayout();
    }
  }

  function restoreDefaultLayout() {
    const layout = cy.layout({
      name: "dagre",
      rankDir: "TB",
      nodeSep: settings.layout?.nodeSep || 54,
      rankSep: settings.layout?.rankSep || 120,
      edgeSep: settings.layout?.edgeSep || 34,
      animate: false,
      fit: false,
    });

    layout.on("layoutstop", () => {
      cy.resize();
      if (isCompactMobile() && !currentNode && !hasActivePath()) {
        hideGraphForMobile();
        return;
      }
      cy.fit(undefined, 40);
    });

    layout.run();
  }

  function setPanelOpen(panel, button, open) {
    if (open) {
      const panels = [
        [ui.nodePanel, ui.togglePanelButton],
        [ui.definitionPanel, ui.toggleDefinitionButton],
        [ui.pathPanel, ui.togglePathFinderButton],
      ];

      panels.forEach(([targetPanel, targetButton]) => {
        const isCurrent = targetPanel === panel;
        targetPanel.classList.toggle("open", isCurrent);
        targetButton.setAttribute("aria-pressed", String(isCurrent));
      });
    } else {
      panel.classList.remove("open");
      button.setAttribute("aria-pressed", "false");
    }
    syncPanelLayout({ refit: true });
  }

  function togglePanelWindow(panel, button) {
    setPanelOpen(panel, button, !panel.classList.contains("open"));
  }

  function syncPanelLayout(options = {}) {
    const { refit = false } = options;
    const nodePanelOpen = ui.nodePanel.classList.contains("open");
    const definitionOpen = ui.definitionPanel.classList.contains("open");
    const pathOpen = ui.pathPanel.classList.contains("open");
    const hasOpenPanel = nodePanelOpen || definitionOpen || pathOpen;

    ui.sidePanels.classList.toggle("has-open", hasOpenPanel);
    queueViewportRefresh({ refit });
  }

  function isPathFinderOpen() {
    return ui.pathPanel.classList.contains("open");
  }

  let viewportRefreshTimer = null;

  function queueViewportRefresh(options = {}) {
    const { refit = false } = options;
    if (viewportRefreshTimer) {
      clearTimeout(viewportRefreshTimer);
    }

    viewportRefreshTimer = setTimeout(() => {
      cy.resize();
      if (refit) {
        refreshViewport();
      }
    }, 220);
  }

  function refreshViewport() {
    if (isCompactMobile() && !currentNode && !hasActivePath()) {
      hideGraphForMobile();
      return;
    }

    const pathNodes = cy.nodes(".path-node, .path-start, .path-end");
    const pathEdges = cy.edges(".path-edge, .path-forward, .path-reverse");
    if (pathNodes.length || pathEdges.length) {
      smartFit(pathNodes.union(pathEdges), 90);
      return;
    }

    if (currentNode && currentNode.length) {
      const depth = getSelectedDepth();
      if (depth > 0) {
        const visibleNodes = cy.nodes().filter((node) => !node.hasClass("dim"));
        const visibleEdges = cy.edges().filter((edge) => !edge.hasClass("dim"));
        const focus = visibleNodes.union(visibleEdges);
        if (focus.length) {
          smartFit(focus, 110, 0.92);
          return;
        }
      }

      if (isCompactMobile()) {
        const visibleNodes = cy.nodes().filter((node) => !node.hasClass("hidden"));
        const visibleEdges = cy.edges().filter((edge) => !edge.hasClass("hidden"));
        const focus = visibleNodes.union(visibleEdges);
        if (focus.length) {
          smartFit(focus, 120, 0.95);
          return;
        }
      }

      smartFit(currentNode, 120);
      return;
    }

    cy.fit(undefined, 40);
  }

  function clearPathHighlights() {
    cy.nodes().removeClass("path-node path-start path-end");
    cy.edges().removeClass("path-edge path-forward path-reverse");
    cy.elements().removeClass("path-dim");
  }

  function hasActivePath() {
    return cy.nodes(".path-node, .path-start, .path-end").length > 0;
  }

  function resetGraphState() {
    showFullGraph();
    clearAllHighlights();
    clearPathHighlights();
  }

  function applyEdgeHighlight(rootNode, depth) {
    if (!rootNode || depth === 0 || Number.isNaN(depth)) return;

    const rootId = rootNode.id();
    const outSet = bfsDir(rootId, depth, ADJ_OUT);
    const inSet = bfsDir(rootId, depth, ADJ_IN);
    const relatedIds = new Set([...outSet, ...inSet]);

    clearAllHighlights();
    clearPathHighlights();
    cy.nodes().addClass("hidden");
    cy.edges().addClass("hidden");

    cy.nodes().forEach((node) => {
      if (relatedIds.has(node.id())) {
        node.removeClass("hidden");
      }
    });

    cy.edges().forEach((edge) => {
      const source = edge.source().id();
      const target = edge.target().id();
      if (!relatedIds.has(source) || !relatedIds.has(target)) {
        return;
      }

      edge.removeClass("hidden");

      if (outSet.has(source) && outSet.has(target)) {
        edge.addClass("EH_OUT");
      }

      if (inSet.has(source) && inSet.has(target)) {
        edge.addClass("EH_IN");
      }
    });

    cy.nodes().forEach((node) => {
      const id = node.id();
      if (outSet.has(id)) {
        node.addClass("NH_OUT");
      }

      if (inSet.has(id)) {
        node.addClass("NH_IN");
      }
    });

    const visibleNodes = cy.nodes().filter((node) => !node.hasClass("hidden"));
    const visibleEdges = cy.edges().filter((edge) => !edge.hasClass("hidden"));
    const visibleElements = visibleNodes.union(visibleEdges);
    showGraphContent();
    layoutFocusedSubgraph(visibleElements);
  }

  function applyMobileNodeFocus(rootNode) {
    if (!rootNode || !rootNode.length) return;

    clearAllHighlights();
    clearPathHighlights();
    cy.nodes().addClass("hidden");
    cy.edges().addClass("hidden");

    const rootId = rootNode.id();
    const visibleIds = new Set([
      rootId,
      ...Array.from(ADJ_IN.get(rootId) || []),
      ...Array.from(ADJ_OUT.get(rootId) || []),
    ]);

    cy.nodes().forEach((node) => {
      if (visibleIds.has(node.id())) {
        node.removeClass("hidden");
      }
    });

    cy.edges().forEach((edge) => {
      const source = edge.source().id();
      const target = edge.target().id();
      if ((source === rootId || target === rootId) && visibleIds.has(source) && visibleIds.has(target)) {
        edge.removeClass("hidden");
      }
    });

    showGraphContent();
    const visibleNodes = cy.nodes().filter((node) => !node.hasClass("hidden"));
    const visibleEdges = cy.edges().filter((edge) => !edge.hasClass("hidden"));
    const visibleElements = visibleNodes.union(visibleEdges);

    if (visibleElements.length > 1) {
      layoutFocusedSubgraph(visibleElements);
      return;
    }

    smartFit(rootNode, 150, 1);
  }

  function layoutFocusedSubgraph(eles) {
    const layout = eles.layout({
      name: "dagre",
      rankDir: "TB",
      ranker: "network-simplex",
      nodeSep: 180,
      rankSep: 260,
      edgeSep: 110,
      spacingFactor: 1.28,
      nodeDimensionsIncludeLabels: true,
      animate: false,
      fit: false,
    });

    layout.on("layoutstop", () => {
      smartFit(eles, 170, 0.9);
    });

    layout.run();
  }

  function getNodeByName(name) {
    if (!name) return cy.collection();

    const byId = cy.getElementById(toId(name));
    if (byId && byId.length) return byId;

    const lower = String(name).toLowerCase();
    const byLabel = cy.nodes().filter((node) => (node.data("label") || "").toLowerCase() === lower);
    if (byLabel && byLabel.length) return byLabel[0];

    return byId;
  }

  const equivalentAliases = settings.equivalentAliases || {};
  const preferredAnchors = settings.preferredAnchors || [];

  function resolveAnchorName(label) {
    if (equivalentAliases[label]) {
      const alias = equivalentAliases[label];
      const aliasNode = getNodeByName(alias);
      if (aliasNode && aliasNode.length) return alias;
    }

    const candidates = new Set([label]);
    if (biAdj[label]) {
      biAdj[label].forEach((value) => candidates.add(value));
    }

    for (const name of preferredAnchors) {
      if (candidates.has(name)) {
        const node = getNodeByName(name);
        if (node && node.length) return name;
      }
    }

    for (const name of candidates) {
      const node = getNodeByName(name);
      if (node && node.length) return name;
    }

    return label;
  }

  const allBiLabels = (() => {
    const set = new Set();
    Object.entries(biAdj).forEach(([key, values]) => {
      set.add(key);
      values.forEach((value) => set.add(value));
    });
    return Array.from(set);
  })();

  const allNodeLabels = Array.from(new Set([...Array.from(labelsInNormal), ...allBiLabels])).sort((a, b) => a.localeCompare(b));
  ui.nodeCount.textContent = `(${allNodeLabels.length})`;
  allNodeLabels.forEach((label) => {
    const option = document.createElement("option");
    option.value = label;
    ui.nodeOptions.appendChild(option);
  });

  function getSelectedDepth() {
    if (isPathFinderOpen()) return 0;
    const value = ui.edgeHL.value;
    return value === "1" ? 1 : value === "2" ? 2 : 0;
  }

  function renderNodeList(filterValue) {
    const filter = (filterValue || "").trim().toLowerCase();
    ui.nodeListEl.innerHTML = "";

    const items = allNodeLabels.filter((label) => toDisplayText(label).toLowerCase().includes(toDisplayText(filter)));
    filteredNodeLabels = items;
    keyboardNodeIndex = -1;
    updateNodeFilterMeta(items.length, filter);

    if (currentNode && currentNode.length) {
      const currentLabel = fromIdToLabel(currentNode.id());
      const matchedIndex = items.findIndex((label) => label === currentLabel);
      if (matchedIndex >= 0) {
        keyboardNodeIndex = matchedIndex;
      }
    }

    items.forEach((label, index) => {
      const item = document.createElement("li");
      item.textContent = toDisplayText(label);
      item.dataset.label = label;
      item.title = toDisplayText(label);
      if (index === keyboardNodeIndex) {
        item.classList.add("kbd-active");
      }

      item.addEventListener("click", () => {
        setActiveListItem(label);
        selectNodeByLabel(label);
      });

      ui.nodeListEl.appendChild(item);
    });
  }

  renderNodeList("");
  ui.nodeFilter.addEventListener("input", (event) => renderNodeList(event.target.value));

  function updateNodeFilterMeta(matchCount, filter) {
    if (!filter) {
      ui.nodeFilterMeta.textContent = `Showing all ${allNodeLabels.length} parameters`;
      return;
    }

    ui.nodeFilterMeta.textContent = `${matchCount} match${matchCount === 1 ? "" : "es"} for "${filter}"`;
  }

  function syncKeyboardActiveItem() {
    const listItems = Array.from(document.querySelectorAll("#node-panel-list li"));
    listItems.forEach((item, index) => {
      item.classList.toggle("kbd-active", index === keyboardNodeIndex);
    });
  }

  function selectKeyboardNode() {
    if (keyboardNodeIndex < 0 || keyboardNodeIndex >= filteredNodeLabels.length) return;
    const label = filteredNodeLabels[keyboardNodeIndex];
    setActiveListItem(label);
    selectNodeByLabel(label);
  }

  function setActiveListItem(label) {
    const targetText = toDisplayText(label);
    document.querySelectorAll("#node-panel-list li.active").forEach((node) => node.classList.remove("active"));
    document.querySelectorAll("#node-panel-list li").forEach((node) => {
      if (node.textContent === targetText) {
        node.classList.add("active");
        node.scrollIntoView({ block: "nearest" });
      }
    });
    ui.selectedNodeLabel.textContent = targetText;
  }

  function getRelatedLabels(label) {
    const nodeId = toId(label);
    const incoming = Array.from(ADJ_IN.get(nodeId) || []).map(fromIdToLabel).sort((a, b) => a.localeCompare(b));
    const outgoing = Array.from(ADJ_OUT.get(nodeId) || []).map(fromIdToLabel).sort((a, b) => a.localeCompare(b));
    const equivalent = Array.from(biAdj[label] || []).sort((a, b) => a.localeCompare(b));
    return { incoming, outgoing, equivalent };
  }

  function renderRelationList(listElement, items) {
    listElement.innerHTML = "";
    if (items.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty-list";
      empty.textContent = "No related parameters";
      listElement.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = toDisplayText(item);
      button.addEventListener("click", () => {
        ui.nodeFilter.value = "";
        renderNodeList("");
        setActiveListItem(item);
        selectNodeByLabel(item);
      });
      li.appendChild(button);
      listElement.appendChild(li);
    });
  }

  function updateDetailPanel(label) {
    if (!label) {
      ui.detailTitle.textContent = "Choose a node";
      ui.detailSummary.textContent = "This area is reserved for a future definition, notes, references, or examples for the selected parameter.";
      renderRelationList(ui.incomingList, []);
      renderRelationList(ui.outgoingList, []);
      renderRelationList(ui.equivalentList, []);
      return;
    }

    const related = getRelatedLabels(label);
    ui.detailTitle.textContent = toDisplayText(label);
    ui.detailSummary.textContent = "This space can later hold the formal definition, explanation, references, or update notes for this parameter.";
    renderRelationList(ui.incomingList, related.incoming);
    renderRelationList(ui.outgoingList, related.outgoing);
    renderRelationList(ui.equivalentList, related.equivalent);
  }

  function fromIdToLabel(id) {
    return rawLabelById.get(id) || id;
  }

  function selectNodeByLabel(label) {
    const anchorName = resolveAnchorName(label);
    const anchor = getNodeByName(anchorName);
    if (!anchor || !anchor.length) return false;

    currentNode = anchor;
    cy.nodes().removeClass("SEL");
    anchor.addClass("SEL");

    const depth = getSelectedDepth();
    if (depth > 0) {
      applyEdgeHighlight(anchor, depth);
    } else {
      if (isCompactMobile()) {
        applyMobileNodeFocus(anchor);
      } else {
        showFullGraph();
        clearPathHighlights();
        cy.center(anchor);
      }
    }

    anchor.removeClass("path-node");
    updateDetailPanel(anchorName);
    ui.selectedNodeLabel.textContent = toDisplayText(anchorName);

    return true;
  }

  function findShortestPath(startId, endId, adjacency) {
    const queue = [startId];
    const prev = new Map([[startId, null]]);

    while (queue.length) {
      const current = queue.shift();
      if (current === endId) break;

      const neighbors = adjacency.get(current) || new Set();
      neighbors.forEach((neighbor) => {
        if (!prev.has(neighbor)) {
          prev.set(neighbor, current);
          queue.push(neighbor);
        }
      });
    }

    if (!prev.has(endId)) return null;

    const path = [];
    let cursor = endId;
    while (cursor) {
      path.push(cursor);
      cursor = prev.get(cursor);
    }

    return path.reverse();
  }

  function resolvePathEndpoint(value) {
    const label = resolveInputLabel(value);
    if (!label) return null;

    const anchorLabel = resolveAnchorName(label);
    const node = getNodeByName(anchorLabel);
    if (!node || !node.length) return null;

    return {
      inputLabel: label,
      anchorLabel,
      node,
      id: node.id(),
    };
  }

  function getPathEdge(source, target) {
    let edge = cy.edges().filter((item) => item.source().id() === source && item.target().id() === target);
    if (!edge.length) {
      edge = cy.edges().filter((item) => item.source().id() === target && item.target().id() === source);
    }
    return edge;
  }

  function getPathStepDirection(source, target) {
    const direct = cy.edges().filter((item) => item.source().id() === source && item.target().id() === target);
    return direct.length ? "forward" : "reverse";
  }

  function highlightPath(pathIds) {
    clearPathHighlights();
    cy.elements().addClass("path-dim");
    showGraphContent();
    const directions = [];

    pathIds.forEach((nodeId, index) => {
      const node = cy.getElementById(nodeId);
      if (node && node.length) {
        node.removeClass("path-dim");
        node.addClass("path-node");
        if (index === 0) {
          node.removeClass("path-node");
          node.addClass("path-start");
        }
        if (index === pathIds.length - 1) {
          node.removeClass("path-node");
          node.addClass("path-end");
        }
      }
    });

    for (let index = 0; index < pathIds.length - 1; index += 1) {
      const source = pathIds[index];
      const target = pathIds[index + 1];
      const edge = getPathEdge(source, target);
      const direction = getPathStepDirection(source, target);
      directions.push(direction);
      edge.removeClass("path-dim");
      edge.addClass(`path-edge path-${direction}`);
    }

    const collection = cy.collection();
    pathIds.forEach((nodeId) => collection.merge(cy.getElementById(nodeId)));
    for (let index = 0; index < pathIds.length - 1; index += 1) {
      const source = pathIds[index];
      const target = pathIds[index + 1];
      const edge = getPathEdge(source, target);
      collection.merge(edge);
    }
    smartFit(collection, 80);
    return directions;
  }

  function smartFit(eles, padding = 50, maxZoom = 1.25) {
    const target = eles && eles.length ? eles : cy.elements();
    const bounds = target.boundingBox({
      includeLabels: true,
      includeOverlays: false,
    });

    cy.fit(bounds, padding);
    if (cy.zoom() > maxZoom) {
      cy.zoom(maxZoom);
    }
  }

  function resolveInputLabel(value) {
    const raw = (value || "").trim();
    if (!raw) return null;

    const lower = raw.toLowerCase();
    const exact = allNodeLabels.find((label) => toDisplayText(label).toLowerCase() === lower || label.toLowerCase() === lower);
    if (exact) return exact;

    const partial = allNodeLabels.find((label) => toDisplayText(label).toLowerCase().includes(lower) || label.toLowerCase().includes(lower));
    return partial || null;
  }

  function handleFindPath() {
    const from = resolvePathEndpoint(ui.pathFrom.value);
    const to = resolvePathEndpoint(ui.pathTo.value);

    if (!from || !to) {
      ui.pathResult.textContent = "Choose two valid parameters from the list.";
      return;
    }

    const directedPath = findShortestPath(from.id, to.id, ADJ_OUT);
    const undirectedPath = directedPath || findShortestPath(from.id, to.id, ADJ_UNDIRECTED);

    if (!undirectedPath) {
      clearPathHighlights();
      ui.pathResult.textContent = `No connection was found between ${toDisplayText(from.inputLabel)} and ${toDisplayText(to.inputLabel)}.`;
      return;
    }

    currentNode = from.node;
    cy.nodes().removeClass("SEL");
    from.node.addClass("SEL");
    resetGraphState();
    from.node.addClass("SEL");
    const directions = highlightPath(undirectedPath);
    updateDetailPanel(from.anchorLabel);
    setActiveListItem(from.anchorLabel);

    const pathLabels = undirectedPath.map(fromIdToLabel).map(toDisplayText).join(" → ");
    if (directedPath) {
      ui.pathResult.textContent = `Directed path found: ${pathLabels}`;
      return;
    }

    const hasForward = directions.includes("forward");
    const hasReverse = directions.includes("reverse");
    if (hasForward && hasReverse) {
      ui.pathResult.textContent = `Mixed-direction path found: ${pathLabels}. Orange follows the edge direction, teal dashed segments go against it, so this route indicates the parameters are incomparable by a single directed chain.`;
      return;
    }

    ui.pathResult.textContent = `Undirected shortest connection found: ${pathLabels}`;
  }

  ui.fitButton.addEventListener("click", () => refreshViewport());
  ui.toggleDefinitionButton.addEventListener("click", () => {
    togglePanelWindow(ui.definitionPanel, ui.toggleDefinitionButton);
  });
  ui.togglePathFinderButton.addEventListener("click", () => {
    togglePanelWindow(ui.pathPanel, ui.togglePathFinderButton);
    if (isPathFinderOpen()) {
      showFullGraph({ refit: true });
      clearPathHighlights();
      if (currentNode && currentNode.length) {
        currentNode.addClass("SEL");
      }
    }
  });
  ui.closeDefinitionButton.addEventListener("click", () => {
    setPanelOpen(ui.definitionPanel, ui.toggleDefinitionButton, false);
  });
  ui.closeNodePanelButton.addEventListener("click", () => {
    setPanelOpen(ui.nodePanel, ui.togglePanelButton, false);
  });
  ui.closePathFinderButton.addEventListener("click", () => {
    setPanelOpen(ui.pathPanel, ui.togglePathFinderButton, false);
    if (currentNode && currentNode.length) {
      const depth = getSelectedDepth();
      if (depth > 0) {
        applyEdgeHighlight(currentNode, depth);
      } else if (isCompactMobile()) {
        applyMobileNodeFocus(currentNode);
      }
    }
  });
  ui.resetButton.addEventListener("click", () => {
    resetGraphState();
    cy.nodes().removeClass("SEL");
    currentNode = null;
    updateDetailPanel(null);
    ui.pathResult.textContent = "Pick two parameters to trace their shortest connection.";
    ui.selectedNodeLabel.textContent = "";
    if (isCompactMobile()) {
      hideGraphForMobile();
    } else {
      restoreDefaultLayout();
    }
  });

  ui.togglePanelButton.addEventListener("click", () => {
    togglePanelWindow(ui.nodePanel, ui.togglePanelButton);
  });

  ui.edgeHL.addEventListener("change", () => {
    const depth = getSelectedDepth();

    if (currentNode && currentNode.length) {
      if (depth > 0) {
        applyEdgeHighlight(currentNode, depth);
      } else {
        if (isCompactMobile()) {
          applyMobileNodeFocus(currentNode);
          currentNode.addClass("SEL");
        } else {
          showFullGraph({ refit: true });
          clearPathHighlights();
          currentNode.addClass("SEL");
        }
      }
      return;
    }

    showFullGraph({ refit: true });
  });

  ui.nodeFilter.addEventListener("keydown", (event) => {
    if (!filteredNodeLabels.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      keyboardNodeIndex = Math.min(filteredNodeLabels.length - 1, keyboardNodeIndex + 1);
      syncKeyboardActiveItem();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      keyboardNodeIndex = Math.max(0, keyboardNodeIndex - 1);
      syncKeyboardActiveItem();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      selectKeyboardNode();
      return;
    }

    if (event.key === "Escape") {
      ui.nodeFilter.value = "";
      renderNodeList("");
    }
  });

  ui.clearNodeFilterButton.addEventListener("click", () => {
    ui.nodeFilter.value = "";
    renderNodeList("");
    ui.nodeFilter.focus();
  });

  ui.findPathButton.addEventListener("click", handleFindPath);
  ui.clearPathButton.addEventListener("click", () => {
    clearPathHighlights();
    ui.pathResult.textContent = "Pick two parameters to trace their shortest connection.";
    if (currentNode && currentNode.length) {
      const depth = getSelectedDepth();
      if (depth > 0) {
        applyEdgeHighlight(currentNode, depth);
      } else if (isCompactMobile()) {
        applyMobileNodeFocus(currentNode);
      }
    }
  });

  ui.pathFrom.addEventListener("focus", () => {
    activePathInput = "from";
  });

  ui.pathTo.addEventListener("focus", () => {
    activePathInput = "to";
  });

  cy.on("tap", "node", (event) => {
    const node = event.target;
    const selectedLabel = fromIdToLabel(node.id());
    currentNode = node;

    cy.nodes().removeClass("SEL");
    node.addClass("SEL");

    const depth = getSelectedDepth();
    if (depth > 0) {
      applyEdgeHighlight(node, depth);
    } else {
      if (isCompactMobile()) {
        applyMobileNodeFocus(node);
      } else {
        showFullGraph();
        clearPathHighlights();
      }
    }

    updateDetailPanel(selectedLabel);
    if (activePathInput === "to") {
      ui.pathTo.value = selectedLabel;
    } else {
      ui.pathFrom.value = selectedLabel;
    }
  });

  cy.on("tap", (event) => {
    if (event.target === cy) {
      resetGraphState();
      cy.nodes().removeClass("SEL");
      currentNode = null;
      updateDetailPanel(null);
      ui.selectedNodeLabel.textContent = "";
      if (isCompactMobile()) {
        hideGraphForMobile();
      }
    }
  });

  cy.ready(() => {
    updateDetailPanel(null);
    syncPanelLayout({ refit: false });
    if (isCompactMobile()) {
      hideGraphForMobile();
    } else {
      refreshViewport();
    }
  });

  window.addEventListener("resize", () => queueViewportRefresh({ refit: false }));
  mobileMedia.addEventListener("change", () => {
    if (isCompactMobile()) {
      if (hasActivePath()) {
        refreshViewport();
        return;
      }

      if (currentNode && currentNode.length) {
        const depth = getSelectedDepth();
        if (depth > 0) {
          applyEdgeHighlight(currentNode, depth);
        } else {
          applyMobileNodeFocus(currentNode);
        }
        return;
      }

      hideGraphForMobile();
      return;
    }

    setMobileGraphHint(false);
    showFullGraph({ refit: true });
    if (currentNode && currentNode.length) {
      const depth = getSelectedDepth();
      if (depth > 0) {
        applyEdgeHighlight(currentNode, depth);
      } else {
        currentNode.addClass("SEL");
        cy.center(currentNode);
      }
    }
  });

  function loadAnalytics(trackingId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", trackingId);
  }
})();
