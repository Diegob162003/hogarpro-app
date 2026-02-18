from database import db
from datetime import datetime

class ServiceRequest(db.Model):
    __tablename__ = "service_request"

    id = db.Column(db.Integer, primary_key=True)

    # Servicio y plan: no nulos, tamaño suficiente
    service = db.Column(db.String(255), nullable=False)
    plan = db.Column(db.String(100), nullable=False)

    # Precio: decimal con dos decimales para evitar problemas de float
    price = db.Column(db.DECIMAL(10, 2), nullable=False)

    # Fecha y hora: tipo Date y Time de MySQL
    date = db.Column(db.Date, nullable=False)
    hour = db.Column(db.Time, nullable=False)

    # Dirección y teléfono: obligatorios
    address = db.Column(db.String(500), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    # Notas opcionales
    notes = db.Column(db.Text)

    # Fecha de creación automática
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
