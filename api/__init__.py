import os
from flask import Flask
from flask_cors import CORS
from . import db, auth, favoris

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY') or os.urandom(32),
        DATABASE=os.path.join(app.instance_path, 'livremoi.sqlite'),
    )
    os.makedirs(app.instance_path, exist_ok=True)

    CORS(app, supports_credentials=True, origins=['http://localhost:5173'])

    db.init_app(app)
    app.register_blueprint(auth.bp)
    app.register_blueprint(favoris.bp)

    return app
