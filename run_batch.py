#!/usr/bin/env python3
import subprocess
import sys
import os
from pathlib import Path

os.chdir(Path(__file__).parent)

# Run the extraction
result = subprocess.run(
    [sys.executable, "gemini_dag_extractor.py", "extract-all"],
    capture_output=False,
    text=True
)

sys.exit(result.returncode)
