import json
import requests
def upload_file_to_google_drive( folder_id, access_token, file_name, file_content):
    upload_url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
    
    headers = {
        "Authorization": "Bearer " + access_token
    }

    para = {
        "name": f"{file_name}",
        "parents": [folder_id]
    }

    files= {
        'data': ('metadata', json.dumps(para), 'application/json; charset=UTC'),
        'file': ('filename', file_content, 'application/octet-stream')
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