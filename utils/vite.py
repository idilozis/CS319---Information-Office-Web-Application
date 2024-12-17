import json
import os
from django.conf import settings
from django.templatetags.static import static

def get_vite_asset_path(entry_name, file_type='file'):

    # Path to the manifest.json inside `.vite`
    manifest_path = os.path.join(settings.BASE_DIR, 'frontend', 'dist', '.vite', 'manifest.json')
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
            if entry_name in manifest:
                if file_type == 'file':
                    return static(manifest[entry_name]['file'])  # JS file
                elif file_type == 'css':
                    return static(manifest[entry_name]['css'][0])  # First CSS file
    except (FileNotFoundError, KeyError, json.JSONDecodeError):
        pass
    return ''
