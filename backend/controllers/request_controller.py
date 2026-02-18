from flask import request, jsonify
from database import db
from models.service_request import ServiceRequest
from datetime import datetime

def create_request():
    data = request.get_json()

    try:
        # ===== Limpiar precio =====
        raw_price = data.get("price", "0")
        clean_price = raw_price.replace("$", "").replace(".", "").replace(",", ".")
        price = float(clean_price)

        # ===== Convertir fecha y hora a objetos para MySQL =====
        service_date = datetime.strptime(data.get("date"), "%Y-%m-%d").date()
        service_hour = datetime.strptime(data.get("hour"), "%H:%M").time()

        # ===== Crear objeto de la solicitud =====
        new_request = ServiceRequest(
            service=data.get("service"),
            plan=data.get("plan"),
            price=price,
            date=service_date,
            hour=service_hour,
            address=data.get("address"),
            phone=data.get("phone"),
            notes=data.get("notes"),
        )

        db.session.add(new_request)
        db.session.commit()

        return jsonify({"message": "Solicitud creada correctamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
