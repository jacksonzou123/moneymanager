# Jackson Zou
# SoftDev1 PD 9
# K
#

from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("template.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
