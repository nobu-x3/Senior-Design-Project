from deepface import DeepFace

# img1_path = "dataset/img1.jpg"
# img2_path = "dataset/img5.jpg"

# result = DeepFace.verify(
#     img1_path=img1_path, img2_path=img2_path, detector_backend="opencv")
# print(result)

DeepFace.stream("dataset")
