from tkinter import *
from tkinter import ttk


def submit(*args):
    print(studentid.get())

root = Tk()
root.title("ID form")
mainframe = ttk.Frame(root, padding='3 3 12 12')
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)

ttk.Label(mainframe, text="Student ID").grid(column=1, row=1, sticky=W)

studentid = StringVar()
studentid_entry = ttk.Entry(mainframe, width=8, textvariable=studentid)
studentid_entry.grid(column=2, row=1, sticky=E)

ttk.Button(mainframe, text="Submit", command=submit).grid(column=3, row=3, sticky=S)
root.bind('<Return>', submit)
root.mainloop()