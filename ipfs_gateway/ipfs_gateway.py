from flask import Flask, abort, request, send_file
from flask_script import Manager
import os
import requests
import ipfshttpclient
import logging

IPFS_CONNECT_URL = "/ip4/127.0.0.1/tcp/5001/http"
IPFS_FILE_URL = "http://127.0.0.1:8080/ipfs/"
DOMAIN = "http://localhost:5000"

app = Flask(__name__)

manager = Manager(app)

console = logging.StreamHandler()
log = logging.getLogger("logger")
log.addHandler(console)


def download(url):
    h = {"Accept-Encoding": "identity"}
    r = requests.get(url, stream=True, verify=False, headers=h)
    try:
        r.raise_for_status()
    except requests.exceptions.HTTPError as e:
        log.exception("IPFS Server Error! url:{0}, exception:{1}".format(url, str(e)))
        return "IPFS Server Error! \n", 503
    if "content-type" in r.headers:
        return send_file(r.raw, r.headers["content-type"])
    else:
        return send_file(r.raw)


@app.route("/<path:path>")
@app.route("/down/<path:path>")
def down(path):
    try:
        p = os.path.splitext(path)
        hash = str(p[0])
        if not hash or not hash.startswith("Qm"):
            return "<Invalid Path>", 404
        log.info("hash:{0}".format(hash), {"app": "dfile-down-req"})
        url = IPFS_FILE_URL + hash
        return download(url)
    except Exception as e:
        log.exception("Download Error! path:{0}, exception:{1}".format(path, str(e)))
        return "Download Error! \n", 503


@app.route("/", methods=["POST", "PUT"])
@app.route("/up", methods=["POST", "PUT"])
def up():
    try:
        if "file" in request.files:
            file = request.files["file"]
            log.info("file name: {}".format(file.filename), {"app": "dfile-up-req"})
            client = ipfshttpclient.connect(IPFS_CONNECT_URL)
            res = client.add(file)
            log.info("upload res: {}".format(res), {"app": "dfile-up-res"})
            url = DOMAIN + "/" + str(res["Hash"])
            return url
        abort(400)
    except Exception as e:
        log.exception("Upload Error! exception:{}".format(str(e)))
        return "Upload Error! \n", 503


@manager.command
def debug():
    app.run(debug=True, port=5000, host="0.0.0.0")
    log.info("DFile is debugging.")


if __name__ == "__main__":
    manager.run()
    log.info("DFile is running.")
