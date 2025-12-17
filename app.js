// Global state
const state = {
    currentDisease: null,
    currentView: 'clinical',
    selectedNodeId: null,
    trialCache: {}
};

// Category node types that become headers
const CATEGORY_TYPES = ['treatment', 'condition'];
const HEADER_LABELS = ['Criteria', 'Management', 'Findings', 'Initial Presentation', 'Disease location', 'Initial evaluation', 'Treatment Options', 'Options', 'Subsequent Therapy', 'Recurrence Therapy'];

/**
 * Initialize the application
 */
async function initApp() {
    // Wait for DAGs to be loaded
    if (Object.keys(TREES).length === 0) {
        console.log('Waiting for DAGs to load...');
        // Give dag_loader time to fetch and process
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    populateDiseaseSelector();
    setupEventListeners();
}

/**
 * Populate disease dropdown from TREES data
 */
function populateDiseaseSelector() {
    const select = document.getElementById('disease-select');
    const diseases = Object.keys(TREES).sort();
    
    diseases.forEach(disease => {
        const option = document.createElement('option');
        option.value = disease;
        // Use tree_id directly for labels (e.g., DIAG-1, NSCL-10)
        option.textContent = disease;
        select.appendChild(option);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Disease selector
    document.getElementById('disease-select').addEventListener('change', (e) => {
        state.currentDisease = e.target.value;
        if (state.currentDisease) {
            renderTree(TREES[state.currentDisease].root);
        }
    });
    
    // View toggle
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            setView(view);
        });
    });
    
    // Modal close
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('trial-modal').addEventListener('click', (e) => {
        if (e.target.id === 'trial-modal') closeModal();
    });
}

/**
 * Set the current view mode
 */
function setView(view) {
    state.currentView = view;
    
    // Update toggle buttons
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        if (btn.dataset.view === view) {
            btn.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
            btn.classList.remove('text-gray-600');
        } else {
            btn.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
            btn.classList.add('text-gray-600');
        }
    });
    
    // Re-render if tree loaded
    if (state.currentDisease) {
        renderTree(TREES[state.currentDisease].root);
        
        if (view === 'research') {
            fetchAllTrialCounts(TREES[state.currentDisease].root);
        }
    }
}

/**
 * Extract column headers from tree structure
 */
function extractHeaders(node, headers = [], depth = 0) {
    if (HEADER_LABELS.includes(node.label)) {
        if (!headers[depth]) headers[depth] = [];
        if (!headers[depth].includes(node.label)) {
            headers[depth].push(node.label);
        }
    }
    
    if (node.children) {
        node.children.forEach(child => extractHeaders(child, headers, depth + 1));
    }
    
    return headers;
}

/**
 * Check if node is a category/header node
 */
function isHeaderNode(node) {
    return HEADER_LABELS.includes(node.label);
}

/**
 * Render the full tree
 */
function renderTree(rootNode) {
    const canvas = document.getElementById('tree-canvas');
    canvas.innerHTML = '';
    
    // Create tree body
    const treeBody = document.createElement('div');
    treeBody.className = 'tree-body';
    
    // Render from root
    const rootTree = renderNodeRecursive(rootNode);
    treeBody.appendChild(rootTree);
    
    canvas.appendChild(treeBody);
}

/**
 * Render children nodes
 */
function renderChildren(children) {
    const container = document.createElement('div');
    container.className = 'tree-children';
    
    if (children.length === 1) {
        container.classList.add('single-child');
    } else {
        container.classList.add('multi-child');
    }
    
    children.forEach((child, index) => {
        const childWrapper = document.createElement('div');
        childWrapper.className = 'tree-child-wrapper';
        
        // Connector from vertical line
        if (children.length > 1) {
            const connector = document.createElement('div');
            connector.className = 'tree-child-connector';
            childWrapper.appendChild(connector);
        }
        
        // Render the child subtree
        const childTree = renderNodeRecursive(child);
        childWrapper.appendChild(childTree);
        
        container.appendChild(childWrapper);
    });
    
    return container;
}

/**
 * Recursively render a node and its subtree
 */
function renderNodeRecursive(node) {
    const stepContainer = document.createElement('div');
    stepContainer.className = 'tree-step';
    
    // Create the node element
    const nodeEl = createNodeElement(node);
    stepContainer.appendChild(nodeEl);
    
    // If has children, add connector and render children
    if (node.children && node.children.length > 0) {
        const connector = document.createElement('div');
        connector.className = 'tree-connector';
        
        const line = document.createElement('div');
        line.className = 'tree-connector-line';
        connector.appendChild(line);
        
        const arrow = document.createElement('div');
        arrow.className = 'tree-connector-arrow';
        connector.appendChild(arrow);
        
        stepContainer.appendChild(connector);
        
        const childrenContainer = renderChildren(node.children);
        stepContainer.appendChild(childrenContainer);
    }
    
    return stepContainer;
}

/**
 * Create a DOM element for a node
 */
function createNodeElement(node) {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'tree-node';
    nodeEl.id = node.id;
    nodeEl.dataset.nodeId = node.id;
    
    // Treatment nodes get emphasized styling
    if (node.type === 'treatment') {
        nodeEl.classList.add('treatment-node');
    }
    
    // Node content
    const label = document.createElement('div');
    label.textContent = node.label;
    nodeEl.appendChild(label);
    
    // Trial count badge (if available and in research view)
    if (node.trialCount !== undefined && state.currentView === 'research') {
        const badge = document.createElement('div');
        badge.className = 'trial-badge';
        badge.textContent = `${node.trialCount} trials`;
        nodeEl.appendChild(badge);
    }
    
    // Click handler
    nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        selectNode(node);
    });
    
    return nodeEl;
}

/**
 * Handle node selection
 */
function selectNode(node) {
    // Deselect previous
    if (state.selectedNodeId) {
        const prevNode = document.getElementById(state.selectedNodeId);
        if (prevNode) {
            prevNode.classList.remove('active', 'highlighted');
        }
    }
    
    // Select new
    state.selectedNodeId = node.id;
    const nodeEl = document.getElementById(node.id);
    if (nodeEl) {
        nodeEl.classList.add('active');
    }
    
    // Show trial modal if has search term
    if (node.search_term && state.currentView === 'clinical') {
        showTrialModal(node);
    }
}

/**
 * Fetch trial counts for all nodes (Research View)
 */
async function fetchAllTrialCounts(node, results = []) {
    if (node.search_term) {
        const count = await fetchTrialCount(node.search_term);
        results.push({ nodeId: node.id, count });
        updateNodeHeatmap(node.id, count);
    }
    
    if (node.children) {
        for (const child of node.children) {
            await fetchAllTrialCounts(child, results);
        }
    }
    
    return results;
}

/**
 * Fetch trial count from ClinicalTrials.gov API
 */
async function fetchTrialCount(searchTerm) {
    if (state.trialCache[searchTerm]) {
        return state.trialCache[searchTerm];
    }
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        url.searchParams.set('query.term', searchTerm);
        url.searchParams.set('filter.overallStatus', 'RECRUITING');
        url.searchParams.set('pageSize', '10');
        
        const response = await fetch(url);
        const data = await response.json();
        const count = data.totalCount || 0;
        
        state.trialCache[searchTerm] = count;
        return count;
    } catch (error) {
        console.error('Error fetching trials:', error);
        return 0;
    }
}

/**
 * Update node with heatmap color based on trial count
 */
function updateNodeHeatmap(nodeId, count) {
    const nodeEl = document.getElementById(nodeId);
    if (!nodeEl) return;
    
    nodeEl.classList.remove('heatmap-red', 'heatmap-yellow', 'heatmap-green');
    
    if (count === 0) {
        nodeEl.classList.add('heatmap-red');
    } else if (count >= 1 && count <= 5) {
        nodeEl.classList.add('heatmap-yellow');
    } else if (count >= 6) {
        nodeEl.classList.add('heatmap-green');
    }
}

/**
 * Fetch and display trial details
 */
async function showTrialModal(node) {
    const modal = document.getElementById('trial-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const viewAllLink = document.getElementById('view-all-link');
    
    title.textContent = node.label;
    content.innerHTML = '<p class="text-gray-600">Loading trials...</p>';
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        url.searchParams.set('query.term', node.search_term);
        url.searchParams.set('filter.overallStatus', 'RECRUITING');
        url.searchParams.set('pageSize', '10');
        
        const response = await fetch(url);
        const data = await response.json();
        const trials = data.studies || [];
        
        const ctURL = new URL('https://clinicaltrials.gov/search');
        ctURL.searchParams.set('q', node.search_term);
        ctURL.searchParams.set('status', 'RECRUITING');
        viewAllLink.href = ctURL.toString();
        
        // Build content container
        const contentContainer = document.createElement('div');
        
        if (trials.length === 0) {
            contentContainer.innerHTML = '<p class="text-gray-600">No recruiting trials found.</p>';
        } else {
            const list = document.createElement('div');
            list.className = 'space-y-3';
            
            trials.slice(0, 10).forEach(trial => {
                const item = document.createElement('div');
                item.className = 'border border-gray-200 p-3 rounded-md';
                
                const titleEl = document.createElement('a');
                titleEl.href = `https://clinicaltrials.gov/study/${trial.protocolSection.identificationModule.nctId}`;
                titleEl.target = '_blank';
                titleEl.className = 'text-blue-600 hover:text-blue-800 font-medium text-sm';
                titleEl.textContent = trial.protocolSection.identificationModule.officialTitle || 'Untitled Study';
                
                const nctId = document.createElement('div');
                nctId.className = 'text-xs text-gray-500 mt-1';
                nctId.textContent = trial.protocolSection.identificationModule.nctId;
                
                item.appendChild(titleEl);
                item.appendChild(nctId);
                list.appendChild(item);
            });
            
            contentContainer.appendChild(list);
        }
        
        // Add footnotes if present
        if (node.footnote_labels && node.footnote_labels.length > 0 && state.currentDisease) {
            const treeData = TREES[state.currentDisease];
            if (treeData && treeData.footnotes && treeData.footnotes.length > 0) {
                const footnotesDiv = document.createElement('div');
                footnotesDiv.className = 'mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-2';
                
                node.footnote_labels.forEach(label => {
                    const footnote = treeData.footnotes.find(f => f.label === label);
                    if (footnote) {
                        const footnoteEl = document.createElement('div');
                        footnoteEl.innerHTML = `<strong>${footnote.label}.</strong> ${footnote.content}`;
                        footnotesDiv.appendChild(footnoteEl);
                    }
                });
                
                if (footnotesDiv.children.length > 0) {
                    contentContainer.appendChild(footnotesDiv);
                }
            }
        }
        
        content.innerHTML = '';
        content.appendChild(contentContainer);
    } catch (error) {
        console.error('Error loading trials:', error);
        content.innerHTML = '<p class="text-red-600">Error loading trials. Please try again.</p>';
    }
    
    modal.classList.remove('hidden');
}

/**
 * Close trial modal
 */
function closeModal() {
    document.getElementById('trial-modal').classList.add('hidden');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initApp().catch(error => console.error('Failed to initialize app:', error));
});
