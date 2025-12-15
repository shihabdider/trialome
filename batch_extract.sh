#!/bin/bash
# Batch extraction with error handling and resume capability

set -e

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd "$DIR"

# Load environment if available
if [ -f gemini_config.env ]; then
  source gemini_config.env
fi

echo "Starting batch DAG extraction..."
echo "Model: ${GEMINI_MODEL:-gemini-2.5-pro}"
echo ""

# Pass all arguments to Python script (allows --force, --retry-failed, etc.)
python gemini_dag_extractor.py extract-all "$@"

echo ""
echo "Batch extraction complete."
echo "Check extraction_index.json for detailed results."
