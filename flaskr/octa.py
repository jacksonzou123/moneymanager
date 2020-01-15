"""Flask octa api endpoint"""

from json import loads
from sqlite3 import Error

from flask import Blueprint, request, jsonify, session, g

from .controller import require_login, jsonify_response, newTodo, quickStats

BP = Blueprint('octa', __name__, url_prefix='/octa')


@BP.route('/fetch/userinfo', methods=['FETCH'])
@jsonify_response
def user_info():
    return session['user']


@BP.route('/new/transaction', methods=['POST'])
@jsonify_response
def new_transaction():
    try:
        req = loads(request.data)
        g.db.execute(
            f'INSERT INTO transactions VALUES (NULL, {session["user"]["id"]}, "{req["name"]}", {req["amount"]}, "{req["note"]}", "{req["date"]}", "{req["tag"] or ""}")'
        )
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/fetch/transaction', methods=['FETCH'])
@jsonify_response
def get_transaction():
    quickStats()
    try:
        return g.db.execute(
            f'SELECT * FROM transactions WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        return {'success': False}


@BP.route('/new/todo', methods=['POST'])
@jsonify_response
def new_todo():
    try:
        req = loads(request.data)
        g.db.execute(
            f'INSERT INTO todos VALUES (NULL, {session["user"]["id"]}, "{req["title"]}", "{req["body"]}", {req["deadline"]}, 0)'
        )
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}

@BP.route('/fetch/todo', methods=['FETCH'])
@jsonify_response
def get_todo():
    try:
        return g.db.execute(
            f'SELECT * FROM todos WHERE author_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        raise(Error)
        return {'success': False}

@BP.route('/fetch/tag', methods=['FETCH'])
@jsonify_response
def get_tag():
    try:
        return g.db.execute(
            f'SELECT * FROM tags WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        raise(Error)
        return {'success': False}

@BP.route('/new/tag', methods=['POST'])
@jsonify_response
def new_tag():
    try:
        req = loads(request.data)
        g.db.execute(
            f'INSERT INTO tags VALUES(NULL, {session["user"]["id"]},"{name}", "{note}")'
        )
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}
