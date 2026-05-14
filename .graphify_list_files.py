import json
from pathlib import Path

detect = json.loads(Path(".graphify_detect.json").read_text(encoding="utf-8"))
docs = detect["files"]["document"]
images = detect["files"]["image"]

print(f"DOCS: {len(docs)}")
for f in docs:
    print(f"  {f}")
print(f"IMAGES: {len(images)}")
for f in images:
    print(f"  {f}")
