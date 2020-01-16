"""Flask octa api endpoint"""

from json import loads
from sqlite3 import Error

from flask import Blueprint, request, jsonify, session, g

from .controller import require_login, jsonify_response, assert_fields

from werkzeug.security import check_password_hash, generate_password_hash

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
        if len(req['date']) < 10:
            req['date'] = 'date("now")'
        else:
            req['date'] = '\"'+req['date']+'\"'
        g.db.execute(
            f'INSERT INTO transactions VALUES (NULL, {session["user"]["id"]}, "{req["name"]}", {req["amount"]}, "{req["note"]}", {req["date"]}, "{req["location"]}", "{req["tag"] or "NULL"}")'
        )
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/delete/transaction', methods=['DELETE'])
@jsonify_response
def delete_transaction():
    try:
        req = loads(request.data)
        g.db.execute(
            f'DELETE FROM transactions WHERE transaction_id = "{req["id"]}"')
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/fetch/transaction', methods=['FETCH'])
@jsonify_response
def get_transaction():
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
            f'INSERT INTO todos VALUES (NULL, {session["user"]["id"]}, "{req["name"]}", "{req["summary"]}", {req["deadline"]}, 0)'
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
        return {'success': False}


@BP.route('/fetch/tag', methods=['FETCH'])
@jsonify_response
def get_tag():
    try:
        return g.db.execute(
            f'SELECT * FROM tags WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        return {'success': False}


@BP.route('/new/tag', methods=['POST'])
@jsonify_response
def new_tag():
    try:
        req = loads(request.data)
        g.db.execute(
            f'INSERT INTO tags VALUES(NULL, {session["user"]["id"]},"{req["name"]}", "{req["summary"]}")'
        )
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/new/request', methods=['POST'])
@jsonify_response
def new_request():
    try:
        req = loads(request.data)
        id = g.db.execute(
            f'SELECT id FROM users WHERE username = "{req["name"]}"').fetchone(
            )
        if id and session["user"]["id"] != id["id"]:
            g.db.execute(
                f'INSERT INTO request VALUES (NULL, {session["user"]["id"]}, {id["id"]}, {req["amount"]}, "{req["note"]}", 0)'
            )
            g.db.commit()
            return {'success': True}
        return {'success': False}
    except Error:
        return {'success': False}


@BP.route('/confirm/request', methods=['POST'])
@jsonify_response
def confirm_request():
    try:
        req = loads(request.data)
        g.db.execute(f'UPDATE request SET done = 1 WHERE req_id = {req["id"]}')
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/delete/request', methods=['DELETE'])
@jsonify_response
def delete_request():
    try:
        req = loads(request.data)
        g.db.execute(f'DELETE FROM request WHERE req_id = {req["id"]}')
        g.db.commit()
        return {'success': True}
    except Error:
        return {'success': False}


@BP.route('/fetch/inrequest', methods=['FETCH'])
@jsonify_response
def get_inrequest():
    try:
        return g.db.execute(
            f'SELECT * FROM request WHERE recipient_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        raise (Error)
        return {'success': False}


@BP.route('/fetch/outrequest', methods=['FETCH'])
@jsonify_response
def get_outrequest():
    try:
        return g.db.execute(
            f'SELECT * FROM request WHERE sender_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        raise (Error)
        return {'success': False}


@BP.route('/getusers', methods=['FETCH'])
@jsonify_response
def get_users():
    try:
        return g.db.execute(f'SELECT id, username FROM users').fetchall()
    except Error:
        raise (Error)
        return {'success': False}


@BP.route("/updatepassword", methods=['POST'])
@jsonify_response
def updatepassword():
    try:
        req = loads(request.data)
        if check_password_hash(session["user"]["password"],
                               req["oldpassword"]):
            session["user"]["password"] = generate_password_hash(
                req["newpassword"])
            g.db.execute(
                f'UPDATE users SET password = "{session["user"]["password"]}" WHERE id = {session["user"]["id"]}'
            )
            g.db.commit()
            return {'success': True}
        return {'success': False}
    except Error:
        raise (Error)
        return {'success': False}
