from flask import (Blueprint, request, g, flash, redirect, render_template,
                   session)
from werkzeug.security import check_password_hash, generate_password_hash

from .controller import require_login, assert_fields
from .controller import newTag, getTags, deleteTag, getTransactions, editTransaction, deleteTransaction, newTodo, deleteTodo

BP = Blueprint('view', __name__, url_prefix='')


@BP.route('/', defaults={'path': ''})
@BP.route('/<path:path>')
@require_login
def index(path):
    return render_template('app.html')


@BP.route('/register', methods=['GET', 'POST'])
@assert_fields
def register():
    """Register user in this app"""
    if request.method == 'POST':
        username, password = request.form['username'], request.form['password']
        error = None
        if g.db.execute(f'SELECT id FROM users WHERE username = "{username}"'
                        ).fetchone() is not None:
            error = f'Username {username} is already registered.'
        if error is None:
            g.db.execute(
                f'INSERT INTO users VALUES (NULL, "{username}", "{generate_password_hash(password)}")'
            )
            g.db.commit()
            return redirect('/auth/signin')
        flash(error)
    return render_template('auth.html')


@BP.route('/signin', methods=['GET', 'POST'])
@assert_fields
def login():
    """Log in user in this app"""
    if request.method == 'POST':
        username, password = request.form['username'], request.form['password']
        error = None
        user = g.db.execute(
            f'SELECT * FROM users WHERE username = "{username}"').fetchone()
        if user is None:
            error = f'Username {username} is incorrect.'
        elif not check_password_hash(user['password'], password):
            error = f'Entered password is incorrect.'
        if error is None:
            session.clear()
            session['user'] = user
            return redirect('/')
        flash(error)
    return render_template('auth.html')


@BP.route('/logout', methods=['GET'])
@require_login
def logout():
    """Clear session and logout the user"""
    session.clear()
    return redirect('/')
