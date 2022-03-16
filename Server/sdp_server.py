import json
from flask import Flask
from flask import request
import base64
import io
from PIL import Image
import numpy as np
import cv2

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        data_json = json.loads(data)
        image = data_json['image']
        image_dec = base64.b64decode(image)
        data_np = np.fromstring(image_dec, dtype='uint8')
        decimg = cv2.imdecode(data_np, 1)
        reqnum = data_json['request_num']
        filename = "image{}.jpg".format(reqnum)
        cv2.imwrite(filename, decimg)
        return "<p>Hello World POST!</p>"
    return "<p>Hello World GET!</p>"

