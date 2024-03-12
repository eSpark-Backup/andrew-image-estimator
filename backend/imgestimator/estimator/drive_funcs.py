import json
import requests

client_id = "207646957050-smcmm1qoindocqoeuhmpslnr36bm3fic.apps.googleusercontent.com"
client_secret = "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"
refresh_token = "1//04Z6HkUsMF6bhCgYIARAAGAQSNwF-L9Irr28ZskF0uelnghZG-gA-Q4-wmfnaFde2s9fr2QwPUKly0ZstxiUg5HtJENWYL8mEcag"
def upload_file_to_google_drive(file_name, file_content):
    
    upload_url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
    folder_id = "1R1hNPYclYP-R8-_JKWPUcyTf9aROOJR4"
    access_token = get_access_token(refresh_token, client_id, client_secret)
    headers = {
        "Authorization": "Bearer " + access_token
    }

    para = {
        "name": f"{file_name}",
        "parents": [folder_id]
    }

    files= {
        'data': ('metadata', json.dumps(para), 'application/json'),
        'file': ('filename', file_content, 'image/png')
    }

   
    response = requests.post(upload_url, headers=headers, files=files)

    if response.status_code == 200:
        file_id = response.json()["id"]
        set_public_permissions(access_token, file_id)

        file_url = get_file_url(access_token, file_id)
        return file_url

    else:    
        return None

def set_public_permissions(access_token, file_id):
    permission_url = f"https://www.googleapis.com/drive/v3/files/{file_id}/permissions"
    headers = {
        "Authorization": "Bearer " + access_token,
        "Content-Type": "application/json"
    }

    permission_data = {
        "role": "reader",
        "type": "anyone"
    }

    response = requests.post(permission_url, headers=headers, json=permission_data)

def get_file_url(access_token, file_id):
    file_info_url = f"https://www.googleapis.com/drive/v3/files/{file_id}?fields=webViewLink"
    headers = {
        "Authorization": "Bearer " + access_token,
        "Content-Type": "application/json"
    }
    response = requests.get(file_info_url, headers=headers)
    if response.status_code == 200:
        return response.json().get("webViewLink")
    else:
        return None
    
def get_access_token(refresh_token, client_id, client_secret):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret
    }
    response = requests.post(token_url, data=payload)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print("Error refreshing access token:", response.text)
        return None