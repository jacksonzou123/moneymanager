"""Flask app controller"""

from functools import wraps

from flask import session, redirect, request, render_template, flash


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
            print(request.environ['REMOTE_ADDR'])
            error = None
            for name in request.form:
                if not request.form[name]:
                    flash(f'Field {name} is empty.')
                    return redirect(request.environ['REMOTE_ADDR'])
        return f(*args, **kwargs)

    return decorated_function

def newTransaction(name, amount, note, bookmark):
    g.db.execute(f'INSERT INTO transactions (NULL, "{session["user"]["id"]}", "{name}", {amount}, "{note}", date("now"), "{bookmark}")')
    g.db.commit()
    return True
