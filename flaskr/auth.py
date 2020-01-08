"""Flask app authentication"""

from functools import wraps

from flask import (Blueprint, request, g, flash, redirect, url_for,
                   render_template, session)
from werkzeug.security import check_password_hash, generate_password_hash

BP = Blueprint('auth', __name__, url_prefix='/auth')


@BP.route('/register', methods=(
    'GET',
    'POST',
))
def register():
    """Register user in this app"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        if g.db.execute(f'SELECT id FROM user WHERE username = "{username}"'
                        ).fetchone() is not None:
            error = f'Username {username} is already registered.'
        if error is None:
            g.db.execute(
                f'INSERT INTO user(username, password) VALUES ("{username}", "{generate_password_hash(password)}")'
            )
            g.db.commit()
            return redirect(url_for('auth.login'))
        flash(error)
    return render_template('auth/register.html')


@BP.route('/login', methods=(
    'GET',
    'POST',
))
def login():
    """Log in user in this app"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        user = g.db.execute(
            f'SELECT * FROM user WHERE username = "{username}"').fetchone()
        if user is None:
            error = f'Username {username} is incorrect.'
        elif not check_password_hash(user['password'], password):
            error = f'Entered password is incorrect.'
        if error is None:
            session.clear()
            session['user_id'] = user['id']
            session['username'] = user['username']
            return redirect(url_for('index'))
        flash(error)
    return render_template('auth/login.html')


@BP.route('/logout', methods=('GET', ))
def logout():
    """Clear session and logout the user"""
    session.clear()
    return redirect(url_for('index'))


def require_login(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
