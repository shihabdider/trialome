import json
import os
from create_ct_table import extract_trial_data, flatten_trial_for_csv

# Test with a single file
test_file = "data/ctg-studies/NCT00499109.json"

if os.path.exists(test_file):
    print(f"Testing with {test_file}...")
    with open(test_file, 'r') as f:
        trial_data = json.load(f)
    
    result = extract_trial_data(trial_data)
    
    if result:
        print("\n✓ Extraction successful!")
        print("\nFlattened for CSV:")
        flattened = flatten_trial_for_csv(result)
        for key, value in flattened.items():
            print(f"  {key}: {value[:80] if isinstance(value, str) else value}...")
    else:
        print("✗ Extraction failed")
else:
    print(f"File not found: {test_file}")
