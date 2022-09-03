import json
from flask import Flask
from flask import request
import base64
import numpy as np
import cv2
import os
import requests
from deepface import DeepFace

app = Flask(__name__)
metrics = ["cosine", "euclidean", "euclidean_l2"]
curDirAbs = os.path.abspath(os.path.dirname(__file__)) + "/SESSION"
curDirRel = os.path.relpath(os.path.dirname(__file__)) + "/SESSION"
@app.route('/', methods=['GET', 'POST'])
def process_and_verify_face():
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        data_json = json.loads(data)
        image = data_json['image']
        image_dec = base64.b64decode(image)
        data_np = np.fromstring(image_dec, dtype='uint8')
        decimg = cv2.imdecode(data_np, 1)
        reqnum = int(data_json['request_num'])
        filename = "image{}.jpg".format(reqnum)
        studentid = data_json['studentid'] 
        skip_first_frame = False
        if reqnum == 0 and not baseFileExists(studentid): # if there is no base image already present, use the first received frame as the base image
            filename = 'base.jpg'
            skip_first_frame = True
        img_path = '{}/{}/'.format(curDirAbs, studentid) + filename
        cv2.imwrite('{}/{}/{}'.format(curDirAbs, studentid, filename), decimg) # NOTE: maybe we don't need to save this, just pass a base64
        if reqnum != 0 or (reqnum == 0 and not skip_first_frame): # we do not verify the 
            result = verify(studentid=studentid, img=img_path, reqnum=reqnum)
            print(result)
            send_results_to_dashboard(result, studentid)
        handle_files(studentid)
        
        return result
    return "<p>Hello World GET!</p>"

def verify(studentid:str, img, reqnum:int):
    result = ''
    isDir = os.path.isdir('{}/{}'.format(curDirAbs, studentid))
    # isFile = os.path.isfile("{}/{}/image{}.jpg".format(curDirAbs,studentid, reqnum))

    if(isDir):
        result = DeepFace.verify(img1_path=img, img2_path = "{}/{}/base.jpg".format(curDirAbs, studentid), distance_metric = metrics[2], detector_backend='ssd')
    return result

def handle_files(studentid:str):
    dir = '{}/{}'.format(curDirAbs, studentid)
    isDir = os.path.isdir(dir)
    if(not isDir):
        return
    
    for root, dirs, files in os.walk(dir):
        if len(files) > 10:
            for file in files:
                if not file == 'base.jpg':
                    path = os.path.join(dir, file)
                    os.remove(path)


def send_results_to_dashboard(results, studentid):
    dashboard_api = "https://localhost:7113/api/Dashboard/server/" + studentid
    payload = json.dumps({'StudentID':studentid, 'Status': results['verified'], 'FirstName':'', 'LastName':''}) #{'studentid': studentid, 'result':results['verified']}
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    response = requests.post(dashboard_api, data=payload, headers=headers, verify=False)
    print(response)

def baseFileExists(studentid):
    return os.path.isfile('{}/{}/'.format(curDirAbs, studentid) + 'base.jpg')

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=5000)
    print("Server started!")