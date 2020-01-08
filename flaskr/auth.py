"""Flask app authentication"""

from flask import (Blueprint, request, g, flash, redirect, render_template,
                   session)
from werkzeug.security import check_password_hash, generate_password_hash

BP = Blueprint('auth', __name__, url_prefix='/auth')


@BP.route('/register', methods=['GET', 'POST'])
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
            return redirect('/auth/signin')
        flash(error)
    return render_template('auth.html')


@BP.route('/signin', methods=['GET', 'POST'])
def login():
    """Log in user in this app"""
    if request.method == 'POST':
        username, password = request.form['username'], request.form['password']
        error = None
        user = g.db.execute(
            f'SELECT * FROM user WHERE username = "{username}"').fetchone()
        if user is None:
            error = f'Username {username} is incorrect.'
        elif not check_password_hash(user['password'], password):
            error = f'Entered password is incorrect.'
        if error is None:
            session.clear()
            session['user_id'], session['username'] = user['id'], user[
                'username']
            return redirect('/')
        flash(error)
    return render_template('auth.html')


@BP.route('/logout', methods=['GET'])
def logout():
    """Clear session and logout the user"""
    session.clear()
    return redirect('/')
