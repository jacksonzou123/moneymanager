"""Flask app controller"""

from sqlite3 import Error
from functools import wraps

from flask import session, redirect, request, flash, jsonify, g


def require_login(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/signin')
        return f(*args, **kwargs)

    return decorated_function


def assert_fields(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method == 'POST':
            error = None
            for name in request.form:
                if not request.form[name]:
                    flash(f'Field {name} is empty.')
                    return redirect(request.environ['REMOTE_ADDR'])
        return f(*args, **kwargs)

    return decorated_function


def jsonify_response(f):
    @wraps(f)
    @require_login
    @assert_fields
    def decorated_function(*args, **kwargs):
        response = jsonify(f(*args, **kwargs))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return decorated_function


def getTransactions():
    try:
        return g.db.execute(
            f'SELECT * FROM transactions WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        return False


def editTransaction(id, name, amount, note, date, tag):
    try:
        g.db.execute(
            f'UPDATE transactions SET transaction_name = {name}, transaction_amount = {amount}, transaction_note = {note}, transaction_date = {date}, tag_id = {tag}'
        )
        return True
    except Error:
        return False


def deleteTransaction(id):
    try:
        g.db.execute(f'DELETE FROM transactions WHERE transaction_id = {id}')
        return True
    except Error:
        return False


#WORKS
def newTag(name, note):
    try:
        g.db.execute(
            f'INSERT INTO tags VALUES(NULL, {session["user"]["id"]},"{name}", "{note}")'
        )
        g.db.commit()
        return True
    except Error:
        print(session["user"]["id"])
        raise (Error)
        return False


def getTags():
    try:
        return g.db.execute(
            f'SELECT * FROM tags WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        return False


def deleteTag(id):
    try:
        g.db.execute(f'DELETE FROM tags WHERE tag_id = {id}')
        return True
    except Error:
        return False


def newTodo(title, body, deadline='date("now")'):
    try:
        g.db.execute(
            f'INSERT INTO todos VALUES (NULL, {session["user"]["id"]}, "{title}", "{body}", {deadline}, 0)'
        )
        g.db.commit()
        return True
    except Error:
        raise (Error)
        return False


def deleteTodo(id):
    try:
        g.db.execute(f'DELETE FROM todos WHERE todo_id = {id}')
        return True
    except Error:
        return False