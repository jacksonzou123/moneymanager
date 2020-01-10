"""Flask template view"""

from flask import Blueprint, render_template

from .controller import require_login

BP = Blueprint('view', __name__, url_prefix='')


@BP.route('/', defaults={'path': ''})
@BP.route('/<path:path>')
@require_login
def index(path):
    return render_template('app.html')