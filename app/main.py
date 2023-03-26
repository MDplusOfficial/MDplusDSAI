"""
Server side Flask program for MDplus DS/AI website.

Author(s):
    Michael Yao

Copyright 2023.
"""
from flask import (
    Flask,
    render_template,
    render_template_string,
    request,
    make_response,
    redirect,
    abort,
    url_for,
    session,
    send_file
)
import json
import datetime
import hashlib
import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
from pip._vendor import cachecontrol
from urllib.parse import urlparse, unquote_plus


app = Flask(__name__)
app.secret_key = "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"
# Set environment to https because OAuth 2.0 only supports https connections.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
# @app.before_request
# def settings():
#     app.config["PERMANENT_SESSION_LIFETIME"] = datetime.timedelta(weeks=4)

GOOGLE_CLIENT_ID = "40152657494-pc96h33pqncup2lkbjg0ramg427jvo06.apps.googleusercontent.com"
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent,
    "client_secret.json"
)


def encode(s: str, salt: str = "") -> str:
    return hashlib.sha512((salt + s.lower()).encode()).hexdigest()


@app.before_request
def before_request():
    session.permanent = True
    app.permanent_session_lifetime = datetime.timedelta(days=14)


@app.route("/sitemap")
@app.route("/sitemap/")
@app.route("/sitemap.xml")
def sitemap():
    """Route to dynamically generate a sitemap of your website/application.

    lastmod and priority tags omitted on static pages.
    lastmod included on dynamic content such as blog posts.
    """
    host_components = urlparse(request.host_url)
    host_base = host_components.scheme + "://" + host_components.netloc

    # Static routes with static content
    static_urls = list()
    for rule in app.url_map.iter_rules():
        if not str(rule).startswith("/sitemap"):
            if "GET" in rule.methods and len(rule.arguments) == 0:
                url = {
                    "loc": f"{host_base}{str(rule)}"
                }
                static_urls.append(url)

    # Dynamic routes with dynamic content
    dynamic_urls = list()

    xml_sitemap = render_template(
        "public/sitemap.xml",
        static_urls=static_urls,
        dynamic_urls=dynamic_urls,
        host_base=host_base
    )
    response = make_response(xml_sitemap)
    response.headers["Content-Type"] = "application/xml"

    return response


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/resources", methods=["GET"])
def resources():
    return render_template("resources.html")


@app.route("/blog", methods=["GET"])
def blog():
    return render_template("blog.html")


@app.route("/blog/<title>", methods=["GET"])
def blogpost(title):
    if len(title) == 0:
        return redirect(url_for("blog"))
    return render_template("blogposts/" + title + ".html")


@app.route("/opportunities", methods=["GET"])
def opportunities():
    return render_template("opportunities.html")


@app.route("/datathon/<year>", methods=["GET"])
def datathon(year):
    return render_template("datathon" + str(year) + ".html")


def error_handler(e):
    if str(e).startswith("400"):
        e = 400
    elif str(e).startswith("401"):
        e = 401
    elif str(e).startswith("403"):
        e = 403
    elif str(e).startswith("404"):
        e = 404
    elif str(e).startswith("412"):
        e = 412
    elif str(e).startswith("500"):
        e = 500
    elif str(e).startswith("503"):
        e = 503
    else:
        e = "Whoops!"
    return render_template("error.html", error=e)

app.register_error_handler(400, error_handler)
app.register_error_handler(401, error_handler)
app.register_error_handler(403, error_handler)
app.register_error_handler(404, error_handler)
app.register_error_handler(412, error_handler)
app.register_error_handler(500, error_handler)
app.register_error_handler(503, error_handler)


if __name__ == "__main__":
    # Only for running the app locally.
    app.run(host='127.0.0.1', port=5000, debug=True)
