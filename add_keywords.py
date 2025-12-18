#!/usr/bin/env python3
import json
import os
import subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

# Directory containing the JSON files
json_dir = Path('/Users/user1/projects/trialome/data/decision_trees/new/nsclc/json')

# Common NSCLC biomarkers and drugs to look for
BIOMARKERS = {
    'EGFR', 'ALK', 'ROS1', 'BRAF', 'KRAS', 'MET', 'PD-L1', 'NTRK',
    'TP53', 'STK11', 'KEAP1', 'NF1', 'SMARCA4', 'PTEN', 'ERBB2', 'HER2',
    'PDL1', 'TMB', 'MSI', 'dMMR', 'PD-L2', 'FISH', 'IHC', 'NGS'
}

DRUGS = {
    'erlotinib', 'gefitinib', 'afatinib', 'dacomitinib', 'osimertinib',
    'crizotinib', 'ceritinib', 'alectinib', 'brigatinib', 'ensartinib',
    'entrectinib', 'larotrectinib',
    'pembrolitumab', 'nivolumab', 'atezolizumab', 'durvalumab', 'avelumab',
    'ipilimumab', 'CTLA-4', 'bevacizumab', 'angiogenesis',
    'pemetrexed', 'gemcitabine', 'docetaxel', 'paclitaxel', 'cisplatin',
    'carboplatin', 'vinorelbine', 'etoposide', 'ifosfamide',
    'ramucirumab', 'VEGFR', 'TKI', 'checkpoint inhibitor'
}

def extract_keywords(json_data):
    """Extract relevant keywords from a decision tree."""
    keywords = set()
    
    # Convert entire JSON to string for searching
    json_str = json.dumps(json_data).lower()
    
    # Check for biomarkers and drugs
    for biomarker in BIOMARKERS:
        if biomarker.lower() in json_str:
            keywords.add(biomarker)
    
    for drug in DRUGS:
        if drug.lower() in json_str:
            keywords.add(drug)
    
    # Extract other relevant terms from content
    # Look for mentions of therapy types, histology, etc.
    common_terms = {
        'squamous cell carcinoma': r'\bsquamous\b',
        'adenocarcinoma': r'\badenocarcinoma\b',
        'large cell': r'\blarge cell\b',
        'immunotherapy': r'\bimmunotherapy\b',
        'chemotherapy': r'\bchemotherapy\b',
        'radiation therapy': r'\bradiation\b',
        'surgery': r'\bsurgery\b|resection',
        'stage I': r'\bstage I[A-C]?\b',
        'stage II': r'\bstage II[A-C]?\b',
        'stage III': r'\bstage III[A-C]?\b',
        'stage IV': r'\bstage IV\b',
        'metastatic': r'\bmetastatic\b',
        'advanced': r'\badvanced\b',
        'screening': r'\bscreening\b',
        'diagnostic': r'\bdiagnostic\b',
        'LDCT': r'\bLDCT\b',
    }
    
    for term, pattern in common_terms.items():
        if re.search(pattern, json_str, re.IGNORECASE):
            keywords.add(term)
    
    return sorted(list(keywords))

def process_file(filepath):
    """Process a single JSON file and add keywords."""
    try:
        # Read the JSON file
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        # Extract keywords
        keywords = extract_keywords(data)
        
        # Create the jq filter to add keywords
        jq_filter = f'. + {{keywords: {json.dumps(keywords)}}}'
        
        # Run jq to add the keywords
        result = subprocess.run(
            ['jq', jq_filter, str(filepath)],
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            print(f"Error processing {filepath.name}: {result.stderr}")
            return False
        
        # Write the result back to the file
        with open(filepath, 'w') as f:
            f.write(result.stdout)
        
        print(f"✓ {filepath.name}: {len(keywords)} keywords added")
        return True
        
    except Exception as e:
        print(f"✗ {filepath.name}: {str(e)}")
        return False

def main():
    # Get all .dag.json files (excluding manifest.json)
    json_files = sorted([
        f for f in json_dir.glob('*.dag.json')
    ])
    
    print(f"Processing {len(json_files)} files in parallel...")
    
    # Process files in parallel
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(process_file, f): f for f in json_files}
        
        completed = 0
        for future in as_completed(futures):
            completed += 1
            if future.result():
                pass
            # Print progress
            if completed % 10 == 0:
                print(f"Progress: {completed}/{len(json_files)}")
    
    print(f"\nCompleted! Processed {len(json_files)} files.")

if __name__ == '__main__':
    main()
