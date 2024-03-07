import json
import requests
def upload_file_to_google_drive(file_name, file_content):
    upload_url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
    folder_id = "1R1hNPYclYP-R8-_JKWPUcyTf9aROOJR4"
    access_token = "ya29.a0Ad52N38g5D8IpV4TmWQiFHEunDhyw8p7MyuqvSka2Tyes5Ab_hVs0c15bcyKdXtuAlLH5Wa0OluBI46NbvT4FCQln1JP45N5ng5I7icsBCrsF3zisG1UZHK_l-QH_TRiEQS84KJIq5M0yQlfqD2OSuHyV5Fzywm23578aCgYKAdYSARASFQHGX2Mi9-l4Z4vE_iF8rn3AyqOigQ0171"
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