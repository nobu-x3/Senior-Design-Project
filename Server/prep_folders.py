import os
import shutil
for i in range(90):
    os.mkdir("D:\Senior-Design-Project\Server\SESSION\{}".format(i), 0x777)
    if i % 9 == 0:
        shutil.copy("D:\Senior-Design-Project\Server\\base.jpg", "D:\Senior-Design-Project\Server\SESSION\{}".format(i))
