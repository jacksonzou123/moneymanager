"""Database builder and access script"""

from sqlite3 import connect, PARSE_DECLTYPES, Row

from flask import current_app, g


def access_db():
    """Create and store a database connection"""
    if 'db' not in g:
        g.db = connect(current_app.config['DATABASE'],
                       detect_types=PARSE_DECLTYPES)
        g.db.row_factory = Row
    return g.db

def close_access():
    """Close a stored database connection"""
    db = g.pop('db', None)
    if db is not None:
        db.close()


def build_db():
    """Build a SQLite3 database with a schema"""
    db = access_db()
    with current_app.open_resource('db/schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def init_db():
    """Initialize the SQLite3 database"""
    build_db()
    close_access()
