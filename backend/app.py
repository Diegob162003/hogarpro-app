from flask import Flask
from flask_cors import CORS
from database import db
from routes.request_routes import request_routes

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] =  "mysql+pymysql://HogarPro:@localhost/hogarpro_db"

db.init_app(app)

app.register_blueprint(request_routes)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
