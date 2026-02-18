# Importa Blueprint desde Flask.
# Blueprint sirve para organizar rutas en módulos separados,
# en lugar de poner todas las rutas en app.py.
from flask import Blueprint

# Importa la función create_request del controlador.
# Esa función es la que realmente procesa la solicitud y guarda datos.
from controllers.request_controller import create_request

# Se crea un Blueprint llamado "requests".
# El primer parámetro es el nombre interno del módulo de rutas.
# __name__ ayuda a Flask a ubicar correctamente el archivo.
request_routes = Blueprint("requests", __name__)

# Aquí se define una ruta HTTP dentro del blueprint.
# "/requests" es la URL que el frontend va a llamar.
# methods=["POST"] indica que solo acepta solicitudes POST.
#
# Al final se le pasa la función create_request,
# que será ejecutada cuando alguien haga POST a esa ruta.
request_routes.route("/requests", methods=["POST"])(create_request)
