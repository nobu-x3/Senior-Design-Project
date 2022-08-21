import matplotlib.pyplot as plt
import numpy as np

data = np.genfromtxt("mmod.csv", delimiter=',', dtype=None, unpack=True)

fig, ax = plt.subplots()
ax.plot(data[0], data[1])
plt.show()

