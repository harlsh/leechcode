

import json, requests

data = json.load(open("data.json", 'r'))

for i in range(len(data)):
    if data[i]["content"] is None:
        continue
    
    if data[i]["solution"]:
        data[i]["solution"] = data[i]["solution"]["content"]
    
    r = requests.post('http://localhost:8080/api/v1/problems', json=data[i])
    print(i)
    # print(f"Status Code: {r.status_code}, Response: {r.json()}")