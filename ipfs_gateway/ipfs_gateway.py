from logging import basicConfig, getLogger, INFO
from rich.logging import RichHandler
from flask import Flask, abort, request, send_file
import os
import requests
import ipfshttpclient

IPFS_CONNECT_URL = "/ip4/127.0.0.1/tcp/5001/http"
IPFS_FILE_URL = "http://127.0.0.1:8080/ipfs/"

basicConfig(
    format="%(message)s", datefmt="[%d-%m %X]", level=INFO, handlers=[RichHandler()]
)
logger = getLogger("rich")
app = Flask(__name__)


def download(url):
    h = {"Accept-Encoding": "identity"}
    r = requests.get(url, stream=True, verify=False, headers=h)
    try:
        r.raise_for_status()
    except requests.exceptions.HTTPError as e:
        logger.exception(
            "IPFS Server Error! url:{0}, exception:{1}".format(url, str(e))
        )
        return "IPFS Server Error! \n", 503
    if "content-type" in r.headers:
        return send_file(r.raw, r.headers["content-type"])
    else:
        return send_file(r.raw)


@app.route("/ping", methods=["GET"])
def ping():
    return "OK", 200


@app.route("/<path:path>")
@app.route("/down/<path:path>")
def down(path):
    try:
        p = os.path.splitext(path)
        hash = str(p[0])
        if not hash or not hash.startswith("Qm"):
            return "<Invalid Path>", 404
        logger.info("hash:{0}".format(hash), {"app": "dfile-down-req"})
        url = IPFS_FILE_URL + hash
        return download(url)
    except Exception as e:
        logger.exception("Download Error! path:{0}, exception:{1}".format(path, str(e)))
        return "Download Error! \n", 503


@app.route("/", methods=["POST", "PUT"])
@app.route("/up", methods=["POST", "PUT"])
def up():
    try:
        if "file" in request.files:
            file = request.files["file"]
            logger.info("file name: {}".format(file.filename), {"app": "dfile-up-req"})
            client = ipfshttpclient.connect(IPFS_CONNECT_URL)
            res = client.add(file)
            logger.info("upload res: {}".format(res), {"app": "dfile-up-res"})
            return str(res["Hash"])
        abort(400)
    except Exception as e:
        logger.exception("Upload Error! exception:{}".format(str(e)))
        return "Upload Error! \n", 503


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
