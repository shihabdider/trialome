#!/bin/bash
cd "$(dirname "$0")"

# Run extraction with output to log file and tail
python3 gemini_dag_extractor.py extract-all 2>&1 | tee extraction_run.log

echo "Extraction complete."
echo "JSONs saved to: data/decision_trees/new/nsclc/json/"
ls -1 data/decision_trees/new/nsclc/json/ | wc -l
