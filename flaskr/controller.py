"""Flask app controller"""

from sqlite3 import Error
from functools import wraps

from flask import session, redirect, request, flash


def require_login(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/auth/signin')
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


def newTransaction(name, amount, note, tag):
    try:
        g.db.execute(
            f'INSERT INTO transactions VALUES (NULL, {session["user"]["id"]}, "{name}", {amount}, "{note}", date("now"), "{tag}")'
        )
        g.db.commit()
        return True
    except Error:
        return False

def getTransactions():
    try:
        return g.db.execute(
            f'SELECT * FROM transactions WHERE user_id = {session["user"]["id"]}'
        ).fetchall()
    except Error:
        return False

def deleteTransaction(id):
    try:
        g.db.execute(
            f'DELETE FROM transactions WHERE transaction_id = {id}'
        )
        return True
    except Error:
        return False

def newTag(name, note):
    try:
        g.db.execute(
            f'INSERT INTO tags VALUES(NULL, {session["user"]["id"]},"{name}", "{note}")'
        )
        g.db.commit()
        return True
    except Error:
        return False

def getTags():
    try:
        return g.db.execute(
            f'SELECT * FROM tags WHERE user_id = {session["user"]["id"]}''
        ).fetchall()
    except Error:
        return False

def newTodo(title, body, deadline):
    try:
        g.db.execute(
            f'INSERT INTO todos VALUES (NULL, {session["user"]["id"]}, "{title}", "{body}", "{deadline}", 0)'
        )
        return True
    except Error:
        return False
