"""Flask app controller"""

from functools import wraps

from flask import g, redirect


def require_login(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect('/auth/signin')

        return view(**kwargs)

    return wrapped_view