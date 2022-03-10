import cv2
from cv2 import VideoCapture

if __name__ == "__main__":
    # vid = cv2.VideoCapture(0)
    # # cv2.namedWindow("test")
    # ret, frame = vid.read()
    # if not ret:
    #     print("failed to grab frame")
    #     exit()
    # # cv2.imshow("test", frame)
    # cv2.imwrite("webcam.png", frame)
    # # cv2.destroyAllWindows()
    # vid.release()

    cam = cv2.VideoCapture(0)
    cv2.namedWindow("Image Capture")

    while True:
        ret, frame = cam.read()
        if not ret:
            print("failed to grab image")
            break
        cv2.imshow("Image Capture", frame)
        k = cv2.waitKey(1)
        if k%256 == 27:
            break
    
    cam.release()
    cv2.destroyAllWindows()
