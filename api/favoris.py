from flask import Blueprint, g, jsonify, request
from .db import get_db
from .auth import login_required

bp = Blueprint('favoris', __name__, url_prefix='/favoris')


@bp.route('/', methods=['GET'])
@login_required
def get_favoris():
    db = get_db()
    rows = db.execute(
        'SELECT book_id FROM favoris WHERE user_id = ? ORDER BY added_at DESC',
        (g.user['id'],)
    ).fetchall()
    return jsonify([row['book_id'] for row in rows]), 200


@bp.route('/', methods=['POST'])
@login_required
def add_favori():
    data = request.get_json()
    book_id = data.get('book_id')
    if not book_id:
        return jsonify({'error': 'book_id requis.'}), 400

    db = get_db()
    try:
        db.execute(
            'INSERT INTO favoris (user_id, book_id) VALUES (?, ?)',
            (g.user['id'], book_id)
        )
        db.commit()
    except db.IntegrityError:
        return jsonify({'error': 'Déjà en favoris.'}), 409

    return jsonify({'success': True}), 201


@bp.route('/<int:book_id>', methods=['DELETE'])
@login_required
def remove_favori(book_id):
    db = get_db()
    db.execute(
        'DELETE FROM favoris WHERE user_id = ? AND book_id = ?',
        (g.user['id'], book_id)
    )
    db.commit()
    return jsonify({'success': True}), 200
