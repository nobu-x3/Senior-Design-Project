import sys

import sys
import subprocess

procs = []
for i in range(90):
    proc = subprocess.Popen([sys.executable, 'capture.py', '{}'.format(i)])
    procs.append(proc)

for proc in procs:
    proc.wait()