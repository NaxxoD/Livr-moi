import functools
from flask import Blueprint, request, session, g, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from .db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM users WHERE id = ?', (user_id,)
        ).fetchone()


@bp.route('/inscription', methods=['POST'])
def inscription():
    data = request.get_json()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not email:
        return jsonify({'error': 'Email requis.'}), 400
    if not password:
        return jsonify({'error': 'Mot de passe requis.'}), 400

    db = get_db()
    try:
        db.execute(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            (email, generate_password_hash(password))
        )
        db.commit()
    except db.IntegrityError:
        return jsonify({'error': f"L'email {email} est déjà utilisé."}), 409

    user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    session.clear()
    session['user_id'] = user['id']
    return jsonify({'id': user['id'], 'email': user['email'], 'role': user['role']}), 201


@bp.route('/connexion', methods=['POST'])
def connexion():
    data = request.get_json()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

    if user is None:
        return jsonify({'error': 'Email introuvable.'}), 401
    if not check_password_hash(user['password_hash'], password):
        return jsonify({'error': 'Mot de passe incorrect.'}), 401

    session.clear()
    session['user_id'] = user['id']
    return jsonify({'id': user['id'], 'email': user['email'], 'role': user['role']}), 200


@bp.route('/deconnexion', methods=['POST'])
def deconnexion():
    session.clear()
    return jsonify({'success': True}), 200


@bp.route('/me')
def me():
    if g.user is None:
        return jsonify({'error': 'Non connecté.'}), 401
    return jsonify({'id': g.user['id'], 'email': g.user['email'], 'role': g.user['role']}), 200


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return jsonify({'error': 'Connexion requise.'}), 401
        return view(**kwargs)
    return wrapped_view
