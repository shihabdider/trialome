#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

json_dir = Path('/Users/user1/projects/trialome/data/decision_trees/new/nsclc/json')
keywords_file = Path('/Users/user1/projects/trialome/keywords_map.json')

# Load keywords map
with open(keywords_file, 'r') as f:
    keywords_map = json.load(f)

def apply_keywords(filename, keywords):
    """Apply keywords to a single JSON file using jq."""
    filepath = json_dir / filename
    
    try:
        jq_filter = f'. + {{keywords: {json.dumps(keywords)}}}'
        result = subprocess.run(
            ['jq', jq_filter, str(filepath)],
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            print(f"✗ {filename}: jq error: {result.stderr}")
            return False
        
        with open(filepath, 'w') as f:
            f.write(result.stdout)
        
        print(f"✓ {filename}: {len(keywords)} keywords added")
        return True
        
    except Exception as e:
        print(f"✗ {filename}: {str(e)}")
        return False

def main():
    print(f"Applying manually-curated keywords to {len(keywords_map)} files in parallel...")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {
            executor.submit(apply_keywords, filename, keywords): filename 
            for filename, keywords in keywords_map.items()
        }
        
        completed = 0
        for future in as_completed(futures):
            completed += 1
            future.result()
            if completed % 10 == 0:
                print(f"Progress: {completed}/{len(keywords_map)}")
    
    print(f"\nCompleted! Applied keywords to {len(keywords_map)} files.")

if __name__ == '__main__':
    main()
