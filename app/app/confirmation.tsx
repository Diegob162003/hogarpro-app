/* ===== IMPORTS ===== */
// View: contenedor que organiza los elementos en pantalla
// Text: muestra texto
// StyleSheet: crea los estilos de la pantalla
import { View, Text, StyleSheet } from "react-native";
// useLocalSearchParams: obtiene los datos que envió la pantalla anterior (request_screen)
// useRouter: permite navegar a otra pantalla
import { useLocalSearchParams, useRouter } from "expo-router";
// Botón reutilizable del proyecto
import { Button } from "@/components/ui/button";

/* ===== COMPONENTE PRINCIPAL ===== */
export default function Confirmation() {
  /* --- Datos recibidos de request_screen --- */
  // params contiene: servicio, date, time, address, notes (opcional)
  const params = useLocalSearchParams<{
    servicio?: string;
    date?: string;
    time?: string;
    address?: string;
    notes?: string;
  }>();
  // router se usa para navegar al presionar "Volver al inicio"
  const router = useRouter();

  /* ===== RENDER ===== */
  return (
    // Contenedor principal: centrado vertical y horizontal, fondo azul claro
    <View style={styles.container}>
      {/* Mensaje principal de éxito */}
      <Text style={styles.title}>Solicitud enviada</Text>
      {/* Indica qué servicio se solicitó */}
      <Text style={styles.subtitle}>
        Tu solicitud de {params.servicio} ha sido registrada.
      </Text>
      {/* Muestra la fecha que eligió el usuario */}
      <Text style={styles.detail}>Fecha: {params.date}</Text>
      {/* Muestra la hora que eligió el usuario */}
      <Text style={styles.detail}>Hora: {params.time}</Text>
      {/* Muestra la dirección donde se hará el servicio */}
      <Text style={styles.detail}>Dirección: {params.address}</Text>
      {/* Notas: solo se muestran si el usuario escribió algo (son opcionales) */}
      {params.notes ? (
        <Text style={styles.detail}>Notas: {params.notes}</Text>
      ) : null}
      {/* Botón que lleva de vuelta al Home; replace evita volver a esta pantalla con "atrás" */}
      <Button
        variant="primary"
        onPress={() => router.replace("/(tabs)")}
        style={styles.button}
      >
        Volver al inicio
      </Button>
    </View>
  );
}

/* ===== ESTILOS ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    padding: 24, // Espacio interno alrededor del contenido
    backgroundColor: "#EFF6FF", // Fondo azul claro (igual que request_screen)
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB", // Azul principal
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 24,
    textAlign: "center",
  },
  detail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  button: {
    marginTop: 32, // Separa el botón del texto de arriba
    minWidth: 200, // Ancho mínimo del botón
  },
});
