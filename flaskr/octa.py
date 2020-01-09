"""Flask octa api endpoint"""

from flask import Blueprint, request, jsonify, session

from .controller import require_login

BP = Blueprint('octa', __name__, url_prefix='/octa')


@BP.route('/userinfo', methods=['POST'])
@require_login
def user_info():
    if request.method == 'POST':
        return jsonify(session['user'])