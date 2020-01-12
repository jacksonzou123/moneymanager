"""Flask template view"""

from flask import Blueprint, render_template
from .controller import require_login, newTag, newTransaction, newTodo

BP = Blueprint('view', __name__, url_prefix='')


@BP.route('/', defaults={'path': ''})
@BP.route('/<path:path>')
@require_login
def index(path):
    return render_template('app.html')

@BP.route('/testing')
def testing():
    newTodo("go poop", "pooping is important")
    return "success"
