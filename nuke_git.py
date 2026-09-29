import shutil
import os
import stat

def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)

if os.path.exists('.git'):
    shutil.rmtree('.git', onerror=remove_readonly)
    print("Deleted .git successfully")
else:
    print(".git not found")
