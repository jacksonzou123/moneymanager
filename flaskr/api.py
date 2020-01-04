"""Flask app endpoints"""

from flask import Blueprint, g

BP = Blueprint(
    'endpoints',
    __name__,
    url_prefix='/api',
)
