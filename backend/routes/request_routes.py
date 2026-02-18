# routes/request_routes.py
from flask import Blueprint, request, jsonify
from controllers.request_controller import create_request as original_create_request
from utils import enviar_telegram

request_routes = Blueprint("requests", __name__)

@request_routes.route("/requests", methods=["POST"])
def create_request():
    # Obtenemos los datos del frontend
    data = request.json

    try:
        # 🔹 Guardamos la solicitud en la base de datos usando la función existente
        resultado_db = original_create_request(data)  # ahora acepta `data`

        # 🔹 Construimos el mensaje para Telegram usando las claves reales
        mensaje = f"""
RESUMEN DE SOLICITUD DE LIMPIEZA
Ticket: SL # -{resultado_db.get('id', '000000')}
Estado: Solicitud enviada con éxito

PLAN SELECCIONADO
Plan: {resultado_db.get('plan')}
Precio: ${resultado_db.get('price')}

INFORMACIÓN DEL SERVICIO
Fecha: {resultado_db.get('date')}
Hora: {resultado_db.get('hour')}
Dirección: {resultado_db.get('address')}
WhatsApp: {resultado_db.get('phone')}
Notas: {resultado_db.get('notes')}
"""

        # 🔹 Enviamos el mensaje al admin por Telegram
        resultado_telegram = enviar_telegram(mensaje)

        # 🔹 Retornamos la respuesta al frontend
        return jsonify({
            "status": "ok",
            "db_result": resultado_db,
            "telegram_result": resultado_telegram
        })

    except Exception as e:
        # Capturamos errores de DB o Telegram
        return jsonify({"status": "error", "error": str(e)}), 500
