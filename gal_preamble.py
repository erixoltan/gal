import zdebug
import datetime
import readline
import re
import sys
import os.path
import uuid
#import tty

class gal:
    @classmethod
    def substring(String, Start, Length):
        return String[Start:Start+Length]
    @classmethod
    def backslash(cls, Count=1):
        Slashes = '\\' * Count
        return Slashes
    @classmethod
    def file_append(cls,file_name,file_text):
        append_file = open(file_name,'a')
        append_file.write(file_text)
        append_file.close()
    @classmethod
    def file_exists(cls,file_name):
        return os.path.exists(file_name)
    @classmethod
    def read_char(cls):
        #tty.setraw(sys.stdin.fileno())
        tty.setcbreak(sys.stdin.fileno())
        return sys.stdin.read(1)
