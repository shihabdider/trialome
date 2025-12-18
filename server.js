/**
 * Simple Express server to serve the frontend and DAG files
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Cache for trials data
let trialsCache = null;

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
 * API endpoint to load trials data from CSV
 */
app.get('/api/trials', (req, res) => {
    // Return cached data if available
    if (trialsCache) {
        return res.json(trialsCache);
    }
    
    const csvPath = path.join(__dirname, 'scripts/clinical_trials_summary.csv');
    
    try {
        const fileContent = fs.readFileSync(csvPath, 'utf8');
        let records = csv.parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        
        // Parse boolean fields
        records = records.map(record => {
            record.Has_Outcome_Data = record.Has_Outcome_Data === 'True' || record.Has_Outcome_Data === 'true';
            record.Accepts_Healthy_Volunteers = record.Accepts_Healthy_Volunteers === 'True' || record.Accepts_Healthy_Volunteers === 'true';
            record.Num_Arms = parseInt(record.Num_Arms) || 0;
            record.Num_Interventions = parseInt(record.Num_Interventions) || 0;
            record.Condition_Count = parseInt(record.Condition_Count) || 0;
            return record;
        });
        
        // Cache the data
        trialsCache = records;
        res.json(records);
    } catch (error) {
        console.error('Error reading trials CSV:', error);
        res.status(500).json({ error: 'Failed to load trials data' });
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
