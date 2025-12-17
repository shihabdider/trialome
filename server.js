/**
 * Simple Express server to serve the frontend and DAG files
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

/**
 * API endpoint to list available DAG files
 */
app.get('/api/list-dags', (req, res) => {
    const dagDir = path.join(__dirname, 'data/decision_trees/new/nsclc/json');
    
    try {
        const files = fs.readdirSync(dagDir)
            .filter(f => f.endsWith('.dag.json'))
            .sort();
        
        res.json(files);
    } catch (error) {
        console.error('Error reading DAG directory:', error);
        res.status(500).json({ error: 'Failed to list DAG files' });
    }
});

/**
 * API endpoint to load a specific DAG file
 */
app.get('/api/dag/:filename', (req, res) => {
    const filename = req.params.filename;
    
    // Security: Prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filepath = path.join(__dirname, 'data/decision_trees/new/nsclc/json', filename);
    
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(`Error reading DAG file ${filename}:`, error);
        res.status(404).json({ error: 'DAG file not found' });
    }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Trialome server running on http://localhost:${PORT}`);
});
