"""Flask app controller"""

from sqlite3 import Error
from functools import wraps

from flask import session, redirect, request, flash, jsonify, g
from datetime import datetime


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
                # print(name)
                # print(request.form[name])
                if not request.form[name]:
                    flash(f'Field {name} is empty.')
                    return redirect(request.environ['REMOTE_ADDR'])
        return f(*args, **kwargs)

    return decorated_function


def jsonify_response(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        response = jsonify(f(*args, **kwargs))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return decorated_function
