from deepface import DeepFace

img1_path = "dataset/img1.jpg"
img2_path = "dataset/img2.jpg"

result = DeepFace.verify(img1_path = img1_path, img2_path = img2_path, detector_backend = "opencv")
print(result)

obj = DeepFace.analyze(img_path = "img2.jpg", actions = ['age', 'gender', 'race', 'emotion'])
result(obj)