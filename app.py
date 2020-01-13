"""Initialize and run the Flask app"""

from flaskr import init_flask_app

if __name__ == "__main__":
    init_flask_app().run(debug=True)