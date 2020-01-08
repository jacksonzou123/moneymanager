"""Flask template view"""

from flask import Blueprint, render_template

from .controller import require_login

BP = Blueprint('view', __name__, url_prefix='')


@BP.route('/', methods=['GET'])
@require_login
def index():
    return render_template('template.html')