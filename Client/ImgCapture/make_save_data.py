import json
student_data = {
    "ID": 0,
    "StudentID": "0",
    "FirstName": "test0",
    "LastName": "test0",
    "BaseImage": "",
    "ImagePath": "",
    "LastUpdate": "0001-01-01T00:00:00",
    "Status": False
  }
json_array = []
for i in range(0, 90):
  temp = student_data.copy()
  temp["FirstName"]="test"+"{}".format(i)
  temp["LastName"]="test"+"{}".format(i)
  temp["StudentID"]="{}".format(i)
  temp["ID"] = i+2
  json_array.append(temp)

with open("SaveData", "w") as write:
  json.dump(json_array, write)
