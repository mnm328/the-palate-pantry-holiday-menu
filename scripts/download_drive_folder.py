import urllib.request
import re
import os
import json
import sys

FOLDER_ID = "1qWTXrcDODImRpceML7dblx2ErgEMeV-H"
TARGET_DIR = "/app/applet/public/assets"

def try_download():
    url = f"https://drive.google.com/drive/folders/{FOLDER_ID}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching folder: {e}")
        return False

    if "ServiceLogin" in html and "drive.google.com/drive/folders" in html:
        print("FOLDER_RESTRICTED: The folder is still set to Restricted.")
        return False

    # Extract files
    # Google Drive embeds items in data callbacks
    matches = re.findall(r'\[\"([a-zA-Z0-9_-]{25,})\",\[\"(.*?)\"', html)
    print(f"Found {len(matches)} potential items in folder.")
    
    os.makedirs(TARGET_DIR, exist_ok=True)
    # Download each file
    for file_id, file_name in matches:
        if any(file_name.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.webp']):
            print(f"Downloading {file_name} ({file_id})...")
            dl_url = f"https://drive.google.com/uc?export=download&id={file_id}"
            dl_req = urllib.request.Request(dl_url, headers={"User-Agent": "Mozilla/5.0"})
            try:
                with urllib.request.urlopen(dl_req) as dl_resp:
                    content = dl_resp.read()
                    with open(os.path.join(TARGET_DIR, file_name), "wb") as f:
                        f.write(content)
                print(f"Saved: {file_name}")
            except Exception as ex:
                print(f"Failed to download {file_name}: {ex}")
    return True

if __name__ == "__main__":
    try_download()
