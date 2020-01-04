"""Flask template view"""

from flask import Blueprint, render_template

BP = Blueprint(
    'view',
    __name__,
)


@BP.route('/', methods=('GET', ))
def index():
    return render_template('template.html')