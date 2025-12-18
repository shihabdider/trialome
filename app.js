// Global state
const state = {
    currentDisease: null,
    currentView: 'clinical',
    selectedNodeId: null,
    trialCache: {},
    navigationHistory: [],
    historyIndex: -1,
    trialsData: [], // All trials from CSV
    filteredTrials: [], // Currently filtered trials
    sortColumn: 'Trial_ID',
    sortDirection: 'asc'
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
    
    // Load trials data
    await loadTrialsData();
    
    populateDiseaseSelector();
    setupEventListeners();
}

/**
 * Load trials data from CSV endpoint
 */
async function loadTrialsData() {
    try {
        const response = await fetch('/api/trials');
        state.trialsData = await response.json();
        state.filteredTrials = [...state.trialsData];
    } catch (error) {
        console.error('Error loading trials data:', error);
        state.trialsData = [];
        state.filteredTrials = [];
    }
}

/**
 * Render the trials data table with sorting and filtering
 */
function renderTrialsTable() {
    const canvas = document.getElementById('tree-canvas');
    
    // Only clear and rebuild if filters don't exist
    if (!document.getElementById('filter-status')) {
        canvas.innerHTML = '';
    }
    
    const container = canvas.querySelector('div') || document.createElement('div');
    if (!canvas.querySelector('div')) {
        container.className = 'p-6 bg-white';
        canvas.appendChild(container);
    }
    
    // Update header
    let header = container.querySelector('[data-header="trials"]');
    if (!header) {
        header = document.createElement('div');
        header.setAttribute('data-header', 'trials');
        header.className = 'mb-4';
        container.insertBefore(header, container.firstChild);
    }
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Trials Database</h2>
        <p class="text-sm text-gray-600">${state.filteredTrials.length} trials</p>
    `;
    
    // Essential columns for display
    const displayColumns = [
        'Trial_ID',
        'Title',
        'Overall_Status',
        'Study_Phase',
        'Primary_Condition',
        'Lead_Sponsor',
        'Primary_Outcomes'
    ];
    
    // Create or update filter controls
    let filterContainer = document.getElementById('filter-container');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.id = 'filter-container';
        filterContainer.className = 'mb-4 p-3 bg-gray-50 rounded border border-gray-200';
        container.insertBefore(filterContainer, container.querySelector('[data-role="table"]'));
    }
    
    // Build unique values from data for dropdowns
    const statuses = ['', ...new Set(state.trialsData.map(t => t.Overall_Status).filter(Boolean))].sort();
    const phases = ['', ...new Set(state.trialsData.map(t => t.Study_Phase).filter(Boolean))].sort();
    
    filterContainer.innerHTML = `
        <div class="grid grid-cols-4 gap-3">
            <div>
                <label class="text-xs font-semibold text-gray-700">Status</label>
                <select id="filter-status" class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    ${statuses.map(status => `<option value="${status}">${status || 'All'}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="text-xs font-semibold text-gray-700">Phase</label>
                <select id="filter-phase" class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    ${phases.map(phase => `<option value="${phase}">${phase || 'All'}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="text-xs font-semibold text-gray-700">Has Outcomes</label>
                <select id="filter-outcomes" class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div>
                <label class="text-xs font-semibold text-gray-700">Search</label>
                <input id="filter-search" type="text" placeholder="Trial ID, title..." class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
    `;
    
    // Table wrapper - reuse or create
    let tableWrapper = container.querySelector('[data-role="table-wrapper"]');
    if (!tableWrapper) {
        tableWrapper = document.createElement('div');
        tableWrapper.setAttribute('data-role', 'table-wrapper');
        tableWrapper.className = 'overflow-x-auto border border-gray-200 rounded-lg';
        container.appendChild(tableWrapper);
    }
    
    // Table - create if doesn't exist
    let table = tableWrapper.querySelector('table');
    if (!table) {
        table = document.createElement('table');
        table.className = 'w-full text-sm';
        tableWrapper.appendChild(table);
        
        // Table header - only create once
        const thead = document.createElement('thead');
        thead.className = 'bg-gray-100 border-b border-gray-200 sticky top-0';
        const headerRow = document.createElement('tr');
        
        displayColumns.forEach(col => {
            const th = document.createElement('th');
            th.className = 'px-4 py-2 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition whitespace-nowrap';
            th.dataset.column = col;
            
            const sortIndicator = state.sortColumn === col ? (state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
            th.innerHTML = `${col.replace(/_/g, ' ')}${sortIndicator}`;
            
            th.addEventListener('click', () => sortTrialsTable(col));
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    } else {
        // Update sort indicators
        table.querySelectorAll('thead th').forEach(th => {
            const col = th.dataset.column;
            const sortIndicator = state.sortColumn === col ? (state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
            th.innerHTML = `${col.replace(/_/g, ' ')}${sortIndicator}`;
        });
    }
    
    // Update table body
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';
    
    state.filteredTrials.forEach((trial, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50';
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => showTrialDetailModal(trial));
        
        displayColumns.forEach(col => {
            const td = document.createElement('td');
            td.className = 'px-4 py-2 text-xs text-gray-900 max-w-xs';
            
            let value = trial[col] || '';
            
            // Truncate long text
            if (typeof value === 'string' && value.length > 60) {
                value = value.substring(0, 60) + '...';
            }
            
            td.textContent = value;
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
    
    // Setup filter listeners (only once)
    if (!document.getElementById('filter-status').dataset.listenersAttached) {
        const filters = {
            status: document.getElementById('filter-status'),
            phase: document.getElementById('filter-phase'),
            outcomes: document.getElementById('filter-outcomes'),
            search: document.getElementById('filter-search')
        };
        
        // All filters trigger table update
        Object.values(filters).forEach(filter => {
            filter.addEventListener('change', () => updateTrialsTableBody(filters));
            filter.addEventListener('input', () => updateTrialsTableBody(filters));
        });
        
        document.getElementById('filter-status').dataset.listenersAttached = 'true';
    }
}

/**
 * Update only the trials table body (filters + sort) without touching filter controls
 * This prevents the search input from losing focus
 */
function updateTrialsTableBody(filters) {
    // Apply filters
    state.filteredTrials = state.trialsData.filter(trial => {
        // Status filter
        if (filters.status.value && trial.Overall_Status !== filters.status.value) {
            return false;
        }
        
        // Phase filter
        if (filters.phase.value && trial.Study_Phase !== filters.phase.value) {
            return false;
        }
        
        // Outcomes filter
        if (filters.outcomes.value === 'yes' && !trial.Has_Outcome_Data) {
            return false;
        }
        if (filters.outcomes.value === 'no' && trial.Has_Outcome_Data) {
            return false;
        }
        
        // Search filter
        if (filters.search.value) {
            const searchTerm = filters.search.value.toLowerCase();
            const matches = (trial.Trial_ID?.toLowerCase().includes(searchTerm)) ||
                   (trial.Title?.toLowerCase().includes(searchTerm));
            if (!matches) return false;
        }
        
        return true;
    });
    
    // Sort filtered results
    state.filteredTrials.sort((a, b) => {
        let aVal = a[state.sortColumn] || '';
        let bVal = b[state.sortColumn] || '';
        
        if (!isNaN(aVal) && !isNaN(bVal) && aVal !== '' && bVal !== '') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Update only the table body and count
    updateTableBodyOnly();
}

/**
 * Update only the table body and header count (no filter controls touched)
 */
function updateTableBodyOnly() {
    const displayColumns = [
        'Trial_ID',
        'Title',
        'Overall_Status',
        'Study_Phase',
        'Primary_Condition',
        'Lead_Sponsor',
        'Primary_Outcomes'
    ];
    
    // Update count in header
    const header = document.querySelector('[data-header="trials"]');
    if (header) {
        header.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Trials Database</h2>
            <p class="text-sm text-gray-600">${state.filteredTrials.length} trials</p>
        `;
    }
    
    // Get or create tbody
    const table = document.querySelector('table');
    if (!table) return;
    
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    
    // Clear and rebuild tbody only
    tbody.innerHTML = '';
    state.filteredTrials.forEach((trial, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50';
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => showTrialDetailModal(trial));
        
        displayColumns.forEach(col => {
            const td = document.createElement('td');
            td.className = 'px-4 py-2 text-xs text-gray-900 max-w-xs';
            
            let value = trial[col] || '';
            if (typeof value === 'string' && value.length > 60) {
                value = value.substring(0, 60) + '...';
            }
            
            td.textContent = value;
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
}

/**
 * Sort trials table (called from column header clicks)
 */
function sortTrialsTable(column) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
    }
    
    // Update sort indicators
    document.querySelectorAll('thead th').forEach(th => {
        const col = th.dataset.column;
        const sortIndicator = state.sortColumn === col ? (state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
        th.innerHTML = `${col.replace(/_/g, ' ')}${sortIndicator}`;
    });
    
    // Re-sort and update only the body
    state.filteredTrials.sort((a, b) => {
        let aVal = a[state.sortColumn] || '';
        let bVal = b[state.sortColumn] || '';
        
        if (!isNaN(aVal) && !isNaN(bVal) && aVal !== '' && bVal !== '') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    updateTableBodyOnly();
}

/**
 * Show detailed trial information in modal
 */
function showTrialDetailModal(trial) {
    const modal = document.getElementById('trial-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const viewAllLink = document.getElementById('view-all-link');
    
    title.textContent = `${trial.Trial_ID} - ${trial.Title}`;
    
    // Create detailed content
    const details = document.createElement('div');
    details.className = 'space-y-4';
    
    // Basic info
    const basicSection = document.createElement('div');
    basicSection.innerHTML = `
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Basic Information</h3>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <div><span class="font-medium text-gray-700">Trial ID:</span> <span class="text-gray-900 font-mono">${trial.Trial_ID}</span></div>
            <div><span class="font-medium text-gray-700">Status:</span> <span class="text-gray-900">${trial.Overall_Status || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Phase:</span> <span class="text-gray-900">${trial.Study_Phase || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Type:</span> <span class="text-gray-900">${trial.Study_Type || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Enrollment:</span> <span class="text-gray-900">${trial.Enrollment || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Masking:</span> <span class="text-gray-900">${trial.Masking || 'N/A'}</span></div>
        </div>
    `;
    details.appendChild(basicSection);
    
    // Dates
    if (trial.Start_Date || trial.Completion_Date) {
        const datesSection = document.createElement('div');
        datesSection.innerHTML = `
            <h3 class="text-sm font-semibold text-gray-900 mb-2">Trial Timeline</h3>
            <div class="grid grid-cols-2 gap-3 text-xs">
                ${trial.Start_Date ? `<div><span class="font-medium text-gray-700">Start Date:</span> <span class="text-gray-900">${trial.Start_Date}</span></div>` : ''}
                ${trial.Primary_Completion_Date ? `<div><span class="font-medium text-gray-700">Primary Completion:</span> <span class="text-gray-900">${trial.Primary_Completion_Date}</span></div>` : ''}
                ${trial.Completion_Date ? `<div><span class="font-medium text-gray-700">Completion Date:</span> <span class="text-gray-900">${trial.Completion_Date}</span></div>` : ''}
            </div>
        `;
        details.appendChild(datesSection);
    }
    
    // Condition and Sponsor
    const conditionSection = document.createElement('div');
    conditionSection.innerHTML = `
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Clinical Information</h3>
        <div class="space-y-2 text-xs">
            <div><span class="font-medium text-gray-700">Primary Condition:</span> <span class="text-gray-900">${trial.Primary_Condition || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">All Conditions:</span> <span class="text-gray-900">${trial.All_Conditions || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Lead Sponsor:</span> <span class="text-gray-900">${trial.Lead_Sponsor || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Sponsor Type:</span> <span class="text-gray-900">${trial.Lead_Sponsor_Type || 'N/A'}</span></div>
        </div>
    `;
    details.appendChild(conditionSection);
    
    // Design details
    const designSection = document.createElement('div');
    designSection.innerHTML = `
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Study Design</h3>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <div><span class="font-medium text-gray-700">Arms:</span> <span class="text-gray-900">${trial.Num_Arms || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Interventions:</span> <span class="text-gray-900">${trial.Num_Interventions || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Intervention Types:</span> <span class="text-gray-900">${trial.Intervention_Types || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Gender:</span> <span class="text-gray-900">${trial.Gender || 'N/A'}</span></div>
            <div><span class="font-medium text-gray-700">Allocation:</span> <span class="text-gray-900">${trial.Allocation || 'N/A'}</span></div>
        </div>
    `;
    details.appendChild(designSection);
    
    // Outcomes
    if (trial.Primary_Outcomes || trial.Secondary_Outcomes) {
        const outcomesSection = document.createElement('div');
        outcomesSection.className = 'bg-blue-50 border border-blue-200 p-3 rounded';
        outcomesSection.innerHTML = `
            <h3 class="text-sm font-semibold text-blue-900 mb-2">Outcome Measures</h3>
            <div class="space-y-2 text-xs">
                ${trial.Primary_Outcomes ? `<div><span class="font-medium text-blue-900">Primary:</span> <span class="text-gray-900">${trial.Primary_Outcomes}</span></div>` : ''}
                ${trial.Secondary_Outcomes ? `<div><span class="font-medium text-blue-900">Secondary:</span> <span class="text-gray-900">${trial.Secondary_Outcomes}</span></div>` : ''}
            </div>
        `;
        details.appendChild(outcomesSection);
    }
    
    // Standard outcome types
    const outcomesStandardSection = document.createElement('div');
    outcomesStandardSection.innerHTML = `<h3 class="text-sm font-semibold text-gray-900 mb-2">Outcome Types</h3>`;
    
    const outcomeTypes = ['OS', 'PFS', 'ORR', 'DFS', 'CR', 'PR', 'ToX', 'QOL'];
    const outcomeGrid = document.createElement('div');
    outcomeGrid.className = 'grid grid-cols-2 gap-2 text-xs';
    
    outcomeTypes.forEach(type => {
        const key = `Outcome_${type}`;
        if (trial[key]) {
            const item = document.createElement('div');
            item.className = 'p-2 bg-gray-50 rounded border border-gray-200';
            item.innerHTML = `<span class="font-medium text-gray-700">${type}:</span> ${trial[key]}`;
            outcomeGrid.appendChild(item);
        }
    });
    
    if (outcomeGrid.children.length > 0) {
        outcomesStandardSection.appendChild(outcomeGrid);
        details.appendChild(outcomesStandardSection);
    }
    
    content.innerHTML = '';
    content.appendChild(details);
    
    // Link to ClinicalTrials.gov
    viewAllLink.href = `https://clinicaltrials.gov/study/${trial.Trial_ID}`;
    viewAllLink.textContent = `View on ClinicalTrials.gov →`;
    
    modal.classList.remove('hidden');
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
            addToNavigationHistory(state.currentDisease);
            // If in research view, show table; otherwise render tree
            if (state.currentView === 'research') {
                renderTrialsTable();
            } else {
                renderTree(TREES[state.currentDisease].root);
            }
        }
    });
    
    // View toggle
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            setView(view);
        });
    });
    
    // Navigation buttons
    document.getElementById('nav-back-btn').addEventListener('click', navigateBack);
    document.getElementById('nav-forward-btn').addEventListener('click', navigateForward);
    
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
    
    // Switch content based on view
    const canvas = document.getElementById('tree-canvas');
    
    if (view === 'research') {
        renderTrialsTable();
    } else if (state.currentDisease) {
        renderTree(TREES[state.currentDisease].root);
        fetchAllTrialCounts(TREES[state.currentDisease].root);
    } else {
        canvas.innerHTML = '<div class="text-center text-gray-500 py-8">Select a disease to begin</div>';
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
    
    // Nodes with tree references get special styling
    if (node.tree_ids && node.tree_ids.length > 0) {
        nodeEl.classList.add('tree-link-node');
    }
    
    // Queryable nodes get indicator styling
    if (node.queryable && node.search_term) {
        nodeEl.classList.add('has-trials');
    }
    
    // Node content
    const label = document.createElement('div');
    
    // Check if label contains bullet points or newlines
    // Split by newlines first, then by bullet characters within each line
    const lineGroups = node.label.split('\n');
    let allItems = [];
    
    lineGroups.forEach(line => {
        // Split by bullet and dagger symbols
        const items = line.split(/[•‣]/);
        items.forEach(item => {
            const trimmed = item.trim();
            if (trimmed) {
                allItems.push(trimmed);
            }
        });
    });
    
    if (allItems.length > 1) {
        // Render as bullet list
        allItems.forEach(itemText => {
            const bulletItem = document.createElement('div');
            bulletItem.className = 'bullet-item';
            
            const bullet = document.createElement('span');
            bullet.className = 'bullet';
            bullet.textContent = '•';
            
            const text = document.createElement('span');
            // Remove any remaining leading symbols
            let cleanedText = itemText.replace(/^[•\-\*▶◀▼▲►◄]\s*/, '').trim();
            text.textContent = cleanedText;
            
            bulletItem.appendChild(bullet);
            bulletItem.appendChild(text);
            label.appendChild(bulletItem);
        });
    } else {
        // Single item - render as text
        label.textContent = node.label;
    }
    
    nodeEl.appendChild(label);
    
    // Clinical trials indicator (Clinical View only, for queryable nodes)
    if (node.queryable && node.search_term && state.currentView === 'clinical') {
        const indicator = document.createElement('div');
        indicator.className = 'trials-indicator';
        indicator.textContent = '⚗ View trials';
        indicator.title = 'Click to view clinical trials';
        nodeEl.appendChild(indicator);
    }
    
    // Tree reference badge (if available)
    if (node.tree_ids && node.tree_ids.length > 0) {
        const badge = document.createElement('div');
        badge.className = 'tree-link-badge';
        badge.textContent = `→ ${node.tree_ids[0]}`;
        
        // Badge click handler - navigate to tree
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetTreeId = node.tree_ids[0];
            if (TREES[targetTreeId]) {
                navigateToTree(targetTreeId);
            }
        });
        
        // Make badge clickable
        badge.style.cursor = 'pointer';
        
        nodeEl.appendChild(badge);
    }
    
    // Trial count badge (if available and in research view)
    if (node.trialCount !== undefined && state.currentView === 'research') {
        const badge = document.createElement('div');
        badge.className = 'trial-badge';
        badge.textContent = `${node.trialCount} trials`;
        nodeEl.appendChild(badge);
    }
    
    // Click handler for the node (opens modal if has search term)
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
 * Only queries nodes marked as queryable to reduce API calls
 * Uses phase breakdown to show P1|P2|P3 badges
 */
async function fetchAllTrialCounts(node, results = []) {
    const treeData = state.currentDisease ? TREES[state.currentDisease] : null;
    const diseaseContext = treeData?.disease || null;
    
    if (node.queryable && node.search_term) {
        const breakdown = await fetchTrialPhaseBreakdown(node.search_term, diseaseContext);
        results.push({ nodeId: node.id, breakdown });
        updateNodeHeatmap(node.id, breakdown);
    }
    
    if (node.children) {
        for (const child of node.children) {
            await fetchAllTrialCounts(child, results);
        }
    }
    
    return results;
}

/**
 * Sanitize search term for ClinicalTrials.gov API
 * The API has limits on query complexity - simplify long/complex terms
 * Keep only the most important 3-4 words to avoid "Too complicated query" errors
 */
function sanitizeSearchTerm(term) {
    // Remove phrases in parentheses like "(if planned)" or "(optional)"
    let sanitized = term.replace(/\([^)]*\)/g, '');
    
    // Replace complex connectors with spaces
    sanitized = sanitized.replace(/\s+(or|and|if|after|before|with|without)\s+/gi, ' ');
    
    // Remove special characters that cause API issues
    sanitized = sanitized.replace(/[,;:+]/g, ' ');
    
    // Collapse multiple spaces
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    
    // Split into words and keep only meaningful ones
    const words = sanitized.split(' ').filter(w => w.length > 2);
    
    // Prioritize medical/treatment terms - keep max 4 words to avoid API complexity limits
    const priorityTerms = ['therapy', 'chemotherapy', 'radiation', 'surgery', 'resection', 
        'pembrolizumab', 'carboplatin', 'cisplatin', 'docetaxel', 'nivolumab', 'atezolizumab',
        'osimertinib', 'erlotinib', 'pemetrexed', 'stage', 'egfr', 'alk', 'mutation'];
    
    const prioritized = words.filter(w => 
        priorityTerms.some(t => w.toLowerCase().includes(t))
    );
    const others = words.filter(w => 
        !priorityTerms.some(t => w.toLowerCase().includes(t))
    );
    
    // Take up to 4 words total, prioritizing medical terms
    const selected = [...prioritized, ...others].slice(0, 4);
    
    return selected.join(' ');
}

/**
 * Fetch trial count from ClinicalTrials.gov API
 */
async function fetchTrialCount(searchTerm, diseaseContext = null) {
    const sanitizedTerm = sanitizeSearchTerm(searchTerm);
    const enrichedTerm = diseaseContext 
        ? `${sanitizedTerm} ${diseaseContext}` 
        : sanitizedTerm;
    
    const cacheKey = enrichedTerm;
    if (state.trialCache[cacheKey]) {
        return state.trialCache[cacheKey];
    }
    
    try {
        const url = new URL('https://clinicaltrials.gov/api/v2/studies');
        url.searchParams.set('query.term', enrichedTerm);
        url.searchParams.set('filter.overallStatus', 'RECRUITING');
        url.searchParams.set('countTotal', 'true');
        url.searchParams.set('pageSize', '10');
        
        const response = await fetch(url);
        const data = await response.json();
        const count = data.totalCount || 0;
        
        state.trialCache[cacheKey] = count;
        return count;
    } catch (error) {
        console.error('Error fetching trials:', error);
        return 0;
    }
}

/**
 * Fetch trial counts broken down by phase (P1, P2, P3)
 * Makes 3 parallel API calls, one per phase using AREA[Phase] in query.term
 */
async function fetchTrialPhaseBreakdown(searchTerm, diseaseContext = null) {
    const sanitizedTerm = sanitizeSearchTerm(searchTerm);
    const baseTerm = diseaseContext 
        ? `${sanitizedTerm} ${diseaseContext}` 
        : sanitizedTerm;
    
    const cacheKey = `phases:${baseTerm}`;
    if (state.trialCache[cacheKey]) {
        return state.trialCache[cacheKey];
    }
    
    const phases = ['PHASE1', 'PHASE2', 'PHASE3'];
    
    try {
        const requests = phases.map(async (phase) => {
            const url = new URL('https://clinicaltrials.gov/api/v2/studies');
            // Use AREA[Phase] syntax to properly filter by phase
            const phaseQuery = `${baseTerm} AREA[Phase]${phase}`;
            url.searchParams.set('query.term', phaseQuery);
            url.searchParams.set('filter.overallStatus', 'RECRUITING');
            url.searchParams.set('countTotal', 'true');
            url.searchParams.set('pageSize', '1');
            
            const response = await fetch(url);
            const data = await response.json();
            return data.totalCount || 0;
        });
        
        const [p1, p2, p3] = await Promise.all(requests);
        
        const breakdown = {
            p1,
            p2,
            p3,
            total: p1 + p2 + p3
        };
        
        state.trialCache[cacheKey] = breakdown;
        return breakdown;
    } catch (error) {
        console.error('Error fetching phase breakdown:', error);
        return { p1: 0, p2: 0, p3: 0, total: 0 };
    }
}

/**
 * Update node with heatmap color and phase breakdown badges
 * @param {string} nodeId - Node DOM ID
 * @param {object} breakdown - { p1, p2, p3, total }
 */
function updateNodeHeatmap(nodeId, breakdown) {
    const nodeEl = document.getElementById(nodeId);
    if (!nodeEl) return;
    
    const total = breakdown.total;
    
    nodeEl.classList.remove('heatmap-red', 'heatmap-yellow', 'heatmap-green');
    
    if (total === 0) {
        nodeEl.classList.add('heatmap-red');
    } else if (total >= 1 && total <= 5) {
        nodeEl.classList.add('heatmap-yellow');
    } else if (total >= 6) {
        nodeEl.classList.add('heatmap-green');
    }
    
    // Remove old badges
    const oldBadge = nodeEl.querySelector('.trial-badge');
    if (oldBadge) oldBadge.remove();
    const oldPhaseBadges = nodeEl.querySelector('.phase-badges');
    if (oldPhaseBadges) oldPhaseBadges.remove();
    
    // Add phase breakdown badges
    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'phase-badges';
    
    if (breakdown.p1 > 0) {
        const p1Badge = document.createElement('span');
        p1Badge.className = 'phase-badge phase-p1';
        p1Badge.textContent = `P1: ${breakdown.p1}`;
        badgeContainer.appendChild(p1Badge);
    }
    
    if (breakdown.p2 > 0) {
        const p2Badge = document.createElement('span');
        p2Badge.className = 'phase-badge phase-p2';
        p2Badge.textContent = `P2: ${breakdown.p2}`;
        badgeContainer.appendChild(p2Badge);
    }
    
    if (breakdown.p3 > 0) {
        const p3Badge = document.createElement('span');
        p3Badge.className = 'phase-badge phase-p3';
        p3Badge.textContent = `P3: ${breakdown.p3}`;
        badgeContainer.appendChild(p3Badge);
    }
    
    // If no phases have trials, show total (which is 0)
    if (breakdown.p1 === 0 && breakdown.p2 === 0 && breakdown.p3 === 0) {
        const noBadge = document.createElement('span');
        noBadge.className = 'phase-badge phase-none';
        noBadge.textContent = '0 trials';
        badgeContainer.appendChild(noBadge);
    }
    
    nodeEl.appendChild(badgeContainer);
}

/**
 * Fetch and display trial details with completed trials section
 */
async function showTrialModal(node) {
    const modal = document.getElementById('trial-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const viewAllLink = document.getElementById('view-all-link');
    
    title.textContent = node.label;
    content.innerHTML = '<p class="text-gray-600">Loading trials...</p>';
    
    const treeData = state.currentDisease ? TREES[state.currentDisease] : null;
    const diseaseContext = treeData?.disease || null;
    const sanitizedTerm = sanitizeSearchTerm(node.search_term);
    const enrichedTerm = diseaseContext 
        ? `${sanitizedTerm} ${diseaseContext}` 
        : sanitizedTerm;
    
    try {
        // Fetch recruiting trials
        const recruitingUrl = new URL('https://clinicaltrials.gov/api/v2/studies');
        recruitingUrl.searchParams.set('query.term', enrichedTerm);
        recruitingUrl.searchParams.set('filter.overallStatus', 'RECRUITING');
        recruitingUrl.searchParams.set('pageSize', '10');
        
        // Fetch completed trials with results (include resultsSection for outcome data)
        const completedUrl = new URL('https://clinicaltrials.gov/api/v2/studies');
        completedUrl.searchParams.set('query.term', enrichedTerm);
        completedUrl.searchParams.set('filter.overallStatus', 'COMPLETED');
        completedUrl.searchParams.set('pageSize', '5');
        completedUrl.searchParams.set('fields', 'protocolSection,hasResults,resultsSection.outcomeMeasuresModule');
        
        const [recruitingRes, completedRes] = await Promise.all([
            fetch(recruitingUrl),
            fetch(completedUrl)
        ]);
        
        const recruitingData = await recruitingRes.json();
        const completedData = await completedRes.json();
        
        const recruitingTrials = recruitingData.studies || [];
        const completedTrials = completedData.studies || [];
        
        // View all link
        const ctURL = new URL('https://clinicaltrials.gov/search');
        ctURL.searchParams.set('q', enrichedTerm);
        viewAllLink.href = ctURL.toString();
        
        // Build content
        content.innerHTML = '';
        
        // Completed trials section (if any)
        if (completedTrials.length > 0) {
            const completedSection = document.createElement('div');
            completedSection.className = 'mb-4';
            completedSection.innerHTML = `
                <h3 class="text-sm font-semibold text-green-700 mb-2">
                    ✓ Completed Trials with Results (${completedTrials.length})
                </h3>
            `;
            
            const completedList = document.createElement('div');
            completedList.className = 'space-y-2';
            
            completedTrials.forEach(trial => {
                const item = renderTrialItem(trial, true);
                completedList.appendChild(item);
            });
            
            completedSection.appendChild(completedList);
            content.appendChild(completedSection);
        }
        
        // Recruiting trials section
        const recruitingSection = document.createElement('div');
        recruitingSection.innerHTML = `
            <h3 class="text-sm font-semibold text-blue-700 mb-2">
                Actively Recruiting (${recruitingTrials.length})
            </h3>
        `;
        
        if (recruitingTrials.length === 0) {
            recruitingSection.innerHTML += '<p class="text-gray-600 text-sm">No recruiting trials found.</p>';
        } else {
            const recruitingList = document.createElement('div');
            recruitingList.className = 'space-y-2';
            
            recruitingTrials.forEach(trial => {
                const item = renderTrialItem(trial, false);
                recruitingList.appendChild(item);
            });
            
            recruitingSection.appendChild(recruitingList);
        }
        
        content.appendChild(recruitingSection);
        
        // Footnotes
        appendFootnotes(content, node);
        
    } catch (error) {
        console.error('Error loading trials:', error);
        content.innerHTML = '<p class="text-red-600">Error loading trials. Please try again.</p>';
    }
    
    modal.classList.remove('hidden');
}

/**
 * Extract key outcome measures from trial results (PFS, OS, ORR, HR, etc.)
 */
function extractOutcomeMeasures(trial) {
    const results = [];
    const outcomeMeasures = trial.resultsSection?.outcomeMeasuresModule?.outcomeMeasures || [];
    
    // Priority keywords for clinically relevant outcomes
    const priorityPatterns = [
        { pattern: /overall\s*survival|^os$/i, label: 'OS' },
        { pattern: /progression.?free\s*survival|^pfs$/i, label: 'PFS' },
        { pattern: /overall\s*response\s*rate|objective\s*response|^orr$/i, label: 'ORR' },
        { pattern: /disease.?free\s*survival|^dfs$/i, label: 'DFS' },
        { pattern: /duration\s*of\s*response|^dor$/i, label: 'DoR' },
    ];
    
    for (const measure of outcomeMeasures) {
        const title = measure.title || '';
        const type = measure.type || '';
        
        // Check if this is a priority outcome
        let label = null;
        for (const { pattern, label: l } of priorityPatterns) {
            if (pattern.test(title)) {
                label = l;
                break;
            }
        }
        
        // Skip non-priority measures if we already have 3 results
        if (!label && results.length >= 3) continue;
        
        // Extract values from classes/categories/measurements
        const classes = measure.classes || [];
        for (const cls of classes) {
            const categories = cls.categories || [];
            for (const cat of categories) {
                const measurements = cat.measurements || [];
                for (const m of measurements) {
                    if (m.value) {
                        const result = {
                            label: label || title.slice(0, 30),
                            value: m.value,
                            unit: measure.unitOfMeasure || '',
                            type: type === 'PRIMARY' ? 'primary' : 'secondary'
                        };
                        
                        // Add spread/CI if available
                        if (m.lowerLimit && m.upperLimit) {
                            result.ci = `${m.lowerLimit}-${m.upperLimit}`;
                        }
                        
                        results.push(result);
                        break; // One value per measure
                    }
                }
                if (results.length >= 5) break;
            }
            if (results.length >= 5) break;
        }
        
        // Also check for analyses (HR, p-values)
        const analyses = measure.analyses || [];
        for (const analysis of analyses) {
            if (analysis.paramType && analysis.paramValue) {
                const result = {
                    label: analysis.paramType.replace(/\s+/g, ' ').slice(0, 20),
                    value: analysis.paramValue,
                    type: 'analysis'
                };
                if (analysis.pValue) {
                    result.pValue = analysis.pValue;
                }
                if (analysis.ciLowerLimit && analysis.ciUpperLimit) {
                    result.ci = `${analysis.ciLowerLimit}-${analysis.ciUpperLimit}`;
                }
                results.push(result);
            }
            if (results.length >= 5) break;
        }
        
        if (results.length >= 5) break;
    }
    
    return results;
}

/**
 * Render a single trial item
 */
function renderTrialItem(trial, isCompleted) {
    const item = document.createElement('div');
    item.className = `border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'} p-3 rounded-md`;
    
    const phases = trial.protocolSection?.designModule?.phases || [];
    const phase = phases.length > 0 ? phases[0].replace('PHASE', 'Phase ') : 'Phase N/A';
    
    const titleEl = document.createElement('a');
    titleEl.href = `https://clinicaltrials.gov/study/${trial.protocolSection.identificationModule.nctId}`;
    titleEl.target = '_blank';
    titleEl.className = 'text-blue-600 hover:text-blue-800 font-medium text-sm';
    titleEl.textContent = trial.protocolSection.identificationModule.officialTitle || 
                          trial.protocolSection.identificationModule.briefTitle || 
                          'Untitled Study';
    
    const metaEl = document.createElement('div');
    metaEl.className = 'flex flex-wrap gap-2 items-center text-xs text-gray-500 mt-1';
    metaEl.innerHTML = `
        <span class="font-mono">${trial.protocolSection.identificationModule.nctId}</span>
        <span class="px-1.5 py-0.5 bg-gray-100 rounded">${phase}</span>
        ${isCompleted && trial.hasResults ? '<span class="px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Has Results</span>' : ''}
    `;
    
    item.appendChild(titleEl);
    item.appendChild(metaEl);
    
    // Display outcome measures for completed trials with results
    if (isCompleted && trial.resultsSection) {
        const outcomes = extractOutcomeMeasures(trial);
        if (outcomes.length > 0) {
            const accordionId = `results-${Math.random().toString(36).substr(2, 9)}`;
            
            const resultsEl = document.createElement('div');
            resultsEl.className = 'mt-2 pt-2 border-t border-green-200';
            
            // Accordion header
            const header = document.createElement('button');
            header.className = 'w-full text-left flex items-center gap-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900';
            header.innerHTML = '<span class="text-gray-500">▶</span> Outcome Measures';
            header.setAttribute('data-accordion-target', accordionId);
            
            // Accordion content (hidden by default)
            const content = document.createElement('div');
            content.id = accordionId;
            content.className = 'hidden mt-2 space-y-1 text-xs';
            
            outcomes.forEach(outcome => {
                const row = document.createElement('div');
                row.className = 'flex flex-col gap-0.5 py-1 px-2 bg-gray-50 rounded border border-gray-100';
                
                const labelSpan = document.createElement('span');
                labelSpan.className = 'text-gray-600 font-medium';
                labelSpan.textContent = outcome.label;
                
                const valueSpan = document.createElement('span');
                valueSpan.className = 'text-gray-900 font-mono';
                let valueText = outcome.value;
                if (outcome.unit) valueText += ` ${outcome.unit}`;
                if (outcome.ci) valueText += ` (CI: ${outcome.ci})`;
                if (outcome.pValue) valueText += ` p=${outcome.pValue}`;
                valueSpan.textContent = valueText;
                
                row.appendChild(labelSpan);
                row.appendChild(valueSpan);
                content.appendChild(row);
            });
            
            // Toggle functionality
            header.addEventListener('click', () => {
                content.classList.toggle('hidden');
                const arrow = header.querySelector('span');
                arrow.textContent = content.classList.contains('hidden') ? '▶' : '▼';
            });
            
            resultsEl.appendChild(header);
            resultsEl.appendChild(content);
            item.appendChild(resultsEl);
        }
    }
    
    return item;
}

/**
 * Append footnotes to modal content
 */
function appendFootnotes(content, node) {
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
                content.appendChild(footnotesDiv);
            }
        }
    }
}

/**
 * Close trial modal
 */
function closeModal() {
    document.getElementById('trial-modal').classList.add('hidden');
}

/**
 * Add tree to navigation history
 */
function addToNavigationHistory(treeId) {
    // Remove any forward history if we're adding a new entry
    if (state.historyIndex < state.navigationHistory.length - 1) {
        state.navigationHistory = state.navigationHistory.slice(0, state.historyIndex + 1);
    }
    
    // Add new entry
    state.navigationHistory.push(treeId);
    state.historyIndex = state.navigationHistory.length - 1;
    
    updateNavigationButtons();
}

/**
 * Navigate to a specific tree
 */
function navigateToTree(treeId) {
    if (!TREES[treeId]) {
        console.error(`Tree ${treeId} not found`);
        return;
    }
    
    state.currentDisease = treeId;
    addToNavigationHistory(treeId);
    document.getElementById('disease-select').value = treeId;
    renderTree(TREES[treeId].root);
    
    if (state.currentView === 'research') {
        fetchAllTrialCounts(TREES[treeId].root);
    }
}

/**
 * Navigate back in history
 */
function navigateBack() {
    if (state.historyIndex > 0) {
        state.historyIndex--;
        const treeId = state.navigationHistory[state.historyIndex];
        state.currentDisease = treeId;
        document.getElementById('disease-select').value = treeId;
        renderTree(TREES[treeId].root);
        
        if (state.currentView === 'research') {
            fetchAllTrialCounts(TREES[treeId].root);
        }
        
        updateNavigationButtons();
    }
}

/**
 * Navigate forward in history
 */
function navigateForward() {
    if (state.historyIndex < state.navigationHistory.length - 1) {
        state.historyIndex++;
        const treeId = state.navigationHistory[state.historyIndex];
        state.currentDisease = treeId;
        document.getElementById('disease-select').value = treeId;
        renderTree(TREES[treeId].root);
        
        if (state.currentView === 'research') {
            fetchAllTrialCounts(TREES[treeId].root);
        }
        
        updateNavigationButtons();
    }
}

/**
 * Update navigation button states
 */
function updateNavigationButtons() {
    const backBtn = document.getElementById('nav-back-btn');
    const forwardBtn = document.getElementById('nav-forward-btn');
    
    backBtn.disabled = state.historyIndex <= 0;
    forwardBtn.disabled = state.historyIndex >= state.navigationHistory.length - 1;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initApp().catch(error => console.error('Failed to initialize app:', error));
});
