# controllers/request_controller.py
from database import db
from models.service_request import ServiceRequest
from datetime import datetime

def create_request(data):
    """
    Crea una nueva solicitud en la base de datos usando los datos recibidos.
    Retorna un dict con información de la solicitud guardada.
    """
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

        # Guardar en la DB
        db.session.add(new_request)
        db.session.commit()

        # Retornar info útil para rutas o Telegram
        return {
            "id": new_request.id,
            "service": new_request.service,
            "plan": new_request.plan,
            "price": price,
            "date": data.get("date"),
            "hour": data.get("hour"),
            "address": data.get("address"),
            "phone": data.get("phone"),
            "notes": data.get("notes")
        }

    except Exception as e:
        db.session.rollback()
        raise e  # Lanzamos la excepción para que request_routes.py la capture
