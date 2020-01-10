"""Flask octa api endpoint"""

from flask import Blueprint, request, jsonify, session

from .controller import require_login, jsonify_response

BP = Blueprint('octa', __name__, url_prefix='/octa')


@BP.route('/userinfo', methods=['FETCH'])
@jsonify_response
def user_info():
    return session['user']
