"""Initialize Flask app"""

from os import path, makedirs

from flask import Flask

from . import view, octa
from .db import init_db, access_db, close_access


def init_flask_app(config={'SECRET_KEY': 'dev'}):
    """Initialize and return the Flask app"""
    app = Flask(__name__)
    app.register_blueprint(octa.BP)
    app.register_blueprint(view.BP)
    app.config.from_mapping(
        SECRET_KEY=config['SECRET_KEY'],
        DATABASE=path.join(app.instance_path, 'flaskr.db'),
    )
    try:
        makedirs(app.instance_path)
    except OSError:
        pass

    with app.app_context():
        init_db()

    @app.before_request
    def before_request():
        access_db()

    @app.teardown_request
    def teardown_request(e):
        close_access()

    return app
