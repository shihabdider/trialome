#!/bin/bash
cd "$(dirname "$0")"

echo "Monitoring extraction progress..."
while true; do
  count=$(ls -1 data/decision_trees/new/nsclc/json/*.dag.json 2>/dev/null | wc -l)
  lines=$(wc -l < extraction.log 2>/dev/null || echo 0)
  echo "[$(date +'%H:%M:%S')] JSONs generated: $count/42 | Log lines: $lines"
  
  if ! ps aux | grep -q "python3 -u gemini_dag_extractor"; then
    echo "Process finished."
    echo "Final result: $(ls -1 data/decision_trees/new/nsclc/json/*.dag.json 2>/dev/null | wc -l) JSON files"
    break
  fi
  
  sleep 30
done
