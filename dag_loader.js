/**
 * DAG Loader - Loads NCCN decision trees from JSON DAG files
 * Converts flat DAG structure to hierarchical tree structure
 */

let TREES = {};

/**
 * Initialize TREES from DAG JSON files (static loading, no API needed)
 */
async function loadDAGsFromServer() {
    await loadDAGsFromHardcodedList();
}

/**
 * Fallback: Load DAGs by discovering files dynamically
 * Uses manifest file if available, otherwise falls back to hardcoded list
 */
async function loadDAGsFromHardcodedList() {
    try {
        // Try to load manifest file that lists all available DAGs
        const manifestResponse = await fetch('./data/decision_trees/new/nsclc/json/manifest.json');
        if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            const dagFiles = manifest.files || [];
            
            for (const file of dagFiles) {
                await loadDAGFile(file);
            }
            return;
        }
    } catch (error) {
        console.log('Manifest file not available');
    }
    
    // Hardcoded comprehensive list of all available NSCLC DAG pages
    // Updated to include all 42 files from data/decision_trees/new/nsclc/json/
    const dagFiles = [
        'nscl_page-0017.dag.json',
        'nscl_page-0018.dag.json',
        'nscl_page-0019.dag.json',
        'nscl_page-0023.dag.json',
        'nscl_page-0024.dag.json',
        'nscl_page-0025.dag.json',
        'nscl_page-0026.dag.json',
        'nscl_page-0027.dag.json',
        'nscl_page-0028.dag.json',
        'nscl_page-0029.dag.json',
        'nscl_page-0030.dag.json',
        'nscl_page-0031.dag.json',
        'nscl_page-0032.dag.json',
        'nscl_page-0033.dag.json',
        'nscl_page-0034.dag.json',
        'nscl_page-0035.dag.json',
        'nscl_page-0036.dag.json',
        'nscl_page-0037.dag.json',
        'nscl_page-0038.dag.json',
        'nscl_page-0039.dag.json',
        'nscl_page-0040.dag.json',
        'nscl_page-0041.dag.json',
        'nscl_page-0042.dag.json',
        'nscl_page-0044.dag.json',
        'nscl_page-0045.dag.json',
        'nscl_page-0046.dag.json',
        'nscl_page-0047.dag.json',
        'nscl_page-0048.dag.json',
        'nscl_page-0049.dag.json',
        'nscl_page-0050.dag.json',
        'nscl_page-0051.dag.json',
        'nscl_page-0052.dag.json',
        'nscl_page-0053.dag.json',
        'nscl_page-0054.dag.json',
        'nscl_page-0055.dag.json',
        'nscl_page-0056.dag.json',
        'nscl_page-0057.dag.json',
        'nscl_page-0058.dag.json',
        'nscl_page-0059.dag.json',
        'nscl_page-0060.dag.json',
        'nscl_page-0061.dag.json',
        'nscl_page-0062.dag.json',
    ];
    
    for (const file of dagFiles) {
        await loadDAGFile(file);
    }
}

/**
 * Load a single DAG file and convert to tree
 */
async function loadDAGFile(filename) {
    try {
        const response = await fetch(`./data/decision_trees/new/nsclc/json/${filename}`);
        const dagData = await response.json();
        
        // Use tree_id from DAG JSON if available, otherwise extract from filename
        const treeId = dagData.tree_id || extractTreeIdFromFilename(filename);
        const treeData = dagToTree(dagData);
        
        TREES[treeId] = {
            root: treeData,
            raw: dagData,
            footnotes: dagData.footnotes || [],
            disease: 'NSCLC',
            diseaseFullName: 'Non-Small Cell Lung Cancer'
        };
        
        console.log(`Loaded DAG: ${treeId}`);
    } catch (error) {
        console.error(`Error loading DAG file ${filename}:`, error);
    }
}

/**
 * Extract tree ID from filename
 * E.g., "nscl_page-0023.dag.json" -> "NSCLC_0023"
 */
function extractTreeIdFromFilename(filename) {
    const match = filename.match(/nscl_page-(\d+)/);
    if (match) {
        return `NSCLC_${match[1]}`;
    }
    return filename.replace('.dag.json', '');
}

/**
 * Convert flat DAG structure to hierarchical tree
 */
function dagToTree(dagData) {
    if (!dagData.nodes || dagData.nodes.length === 0) {
        return null;
    }
    
    // Find root node (no parents)
    const rootNode = dagData.nodes.find(n => n.parent_ids.length === 0);
    if (!rootNode) {
        return null;
    }
    
    // Create node lookup map
    const nodeMap = new Map();
    dagData.nodes.forEach(node => {
        nodeMap.set(node.id, { ...node });
    });
    
    // Build hierarchical structure
    function buildTree(nodeId, visited = new Set()) {
        if (visited.has(nodeId)) {
            return null; // Avoid cycles
        }
        
        const node = nodeMap.get(nodeId);
        if (!node) return null;
        
        visited.add(nodeId);
        
        const classification = classifyNode(node.content);
        const treeNode = {
            id: node.id,
            label: node.content,
            type: classification.type,
            queryable: classification.queryable,
            search_term: classification.queryable ? extractSearchTerm(node.content) : null,
            footnote_labels: node.footnote_labels || [],
            tree_ids: node.tree_ids || [],
            children: []
        };
        
        // Add children
        if (node.children_ids && node.children_ids.length > 0) {
            for (const childId of node.children_ids) {
                const childTree = buildTree(childId, new Set(visited));
                if (childTree) {
                    treeNode.children.push(childTree);
                }
            }
        }
        
        return treeNode;
    }
    
    return buildTree(rootNode.id);
}

/**
 * Node classification for trial query filtering
 * Returns: { type: string, queryable: boolean }
 */
function classifyNode(content) {
    const lower = content.toLowerCase();
    const trimmed = content.trim();
    
    // Skip: Administrative/structural nodes (exact matches or patterns)
    const skipPatterns = [
        /^(see|refer to)/i,
        /^evaluation$/i,
        /^options?$/i,
        /^treatment$/i,
        /^criteria$/i,
        /^management$/i,
        /^findings?$/i,
        /^initial (presentation|evaluation)$/i,
        /^disease location$/i,
        /^subsequent therapy$/i,
        /^recurrence therapy$/i,
        /^treatment options$/i,
        /^workup$/i,
        /^staging$/i,
        /^assessment$/i
    ];
    
    for (const pattern of skipPatterns) {
        if (pattern.test(trimmed)) {
            return { type: 'header', queryable: false };
        }
    }
    
    // Query: Treatment nodes (drugs, regimens, procedures)
    const treatmentIndicators = [
        'therapy', 'chemotherapy', 'radiation', 'surgery', 
        'resection', 'ablation', 'immunotherapy', 'targeted',
        'pembrolizumab', 'carboplatin', 'cisplatin', 'docetaxel',
        'nivolumab', 'atezolizumab', 'osimertinib', 'erlotinib',
        'pemetrexed', 'bevacizumab', 'durvalumab', 'cemiplimab',
        'paclitaxel', 'gemcitabine', 'vinorelbine', 'etoposide'
    ];
    
    if (treatmentIndicators.some(term => lower.includes(term))) {
        return { type: 'treatment', queryable: true };
    }
    
    // Query: Stage/mutation conditions (valuable context)
    const conditionIndicators = [
        'stage', 'egfr', 'alk', 'ros1', 'kras', 'braf', 'met',
        'pd-l1', 'mutation', 'positive', 'negative', 'her2',
        'ret', 'ntrk', 'exon'
    ];
    
    if (conditionIndicators.some(term => lower.includes(term))) {
        return { type: 'condition', queryable: true };
    }
    
    // Default: Don't query generic text
    return { type: 'generic', queryable: false };
}

/**
 * Legacy function for backward compatibility
 */
function classifyNodeType(content) {
    return classifyNode(content).type;
}

/**
 * Extract search term from node content
 * For now, use the first line or main keywords
 */
function extractSearchTerm(content) {
    if (!content) return null;
    
    // Remove special characters, line breaks, and abbreviations
    let cleaned = content
        .split('\n')[0] // First line
        .replace(/[•\s]+/g, ' ')
        .trim();
    
    // Skip generic labels
    if (cleaned === 'Treatment' || 
        cleaned === 'Evaluation' || 
        cleaned === 'Options' ||
        cleaned === 'Initial Presentation' ||
        cleaned.length < 3) {
        return null;
    }
    
    return cleaned;
}

/**
 * Load all DAGs when page loads
 */
async function initializeDAGs() {
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', async () => {
            await loadDAGsFromServer();
        });
    }
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    // Load DAGs as soon as this script loads
    console.log('dag_loader.js loaded, starting DAG loading...');
    loadDAGsFromServer().then(() => {
        console.log(`Successfully loaded ${Object.keys(TREES).length} DAGs`);
    }).catch(error => {
        console.error('Error in DAG loading:', error);
    });
}
