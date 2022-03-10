import numpy as np
import cv2
import os
import matplotlib.pyplot as plt
import pkg_resources

# dataset taken from https://github.com/serengil/deepface/tree/master/tests/dataset


def findFace(target_file):
    img = detect_face(target_file)
    # print(img.shape)
    idx, confidence = model.predict(img)

    fig = plt.figure()

    ax1 = fig.add_subplot(1, 2, 1)
    # plt.imshow(img[:,:,::-1])
    plt.imshow(cv2.imread(target_file)[:, :, ::-1])
    plt.axis('off')

    ax1 = fig.add_subplot(1, 2, 2)
    #plt.imshow(faces[id], cmap='gray')
    plt.imshow(cv2.imread(face_db[idx])[:, :, ::-1])
    plt.axis('off')

    plt.show()

    print("Confidence: ", round(confidence, 2))


def detect_face(img_path):
    img = cv2.imread(img_path)

    detected_faces = faceCascade.detectMultiScale(img, 1.3, 5)
    x, y, w, h = detected_faces[0]  # focus on the 1st face in the image

    img = img[y:y+h, x:x+w]  # focus on the detected area
    img = cv2.resize(img, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    return img


if __name__ == "__main__":

    # Checking correct library installs #####################################################
    print(cv2.__version__)
    installed_packages = pkg_resources.working_set
    installed_packages_list = sorted(
        ["%s==%s" % (i.key, i.version) for i in installed_packages])

    is_installed = False
    for installation in installed_packages_list:
        package, version = installation.split("==")
        # print(installation)

        if 'opencv-contrib-python' == package:
            is_installed = True
            break

    if is_installed != True:
        raise ValueError(
            "opencv-contrib-python is not installed on your environment. Please run pip install --user opencv-contrib-python command")
    ###########################################################################################

    # Face Detection ##########################################################################
    opencv_home = cv2.__file__
    # print(opencv_home)
    folders = opencv_home.split(os.path.sep)[0:-1]
    path = folders[0]
    for folder in folders[1:]:
        path = path + "/" + folder

    face_detector_path = path+"/data/haarcascade_frontalface_default.xml"
    faceCascade = cv2.CascadeClassifier(face_detector_path)

    face_db = [
        "dataset/img1.jpg",  # AJ
        "dataset/img3.jpg",  # Jennifer Aniston
        "dataset/img8.jpg",  # SJ
        "dataset/img14.jpg",  # MZ
        "dataset/img17.jpg",	 # Jack Dorsey
        "dataset/img30.jpg",  # Matt Damon
        "dataset/img44.jpg"  # Katy Perry
    ]
    faces = []
    for img_path in face_db:
        detected_face = detect_face(img_path)
        # plt.imshow(detected_face)
        # plt.show()
        faces.append(detected_face)

    ids = np.array([i for i in range(0, len(faces))])
    # print(ids)
    # print(faces)
    #############################################################################################

    # Model Training ####################################
    # model = cv2.face.EigenFaceRecognizer_create()
    model = cv2.face.LBPHFaceRecognizer_create()  # Local Binary Patterns Histograms
    model.train(faces, ids)
    model.save("model.yml")
    #####################################################

    findFace("dataset/img59.jpg")
