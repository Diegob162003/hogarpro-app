/* ===== IMPORTS ===== */
// View: contenedor que organiza los elementos en pantalla
// Text: muestra texto
// StyleSheet: crea los estilos de la pantalla
import { View, Text, StyleSheet } from "react-native";
import { useMemo } from "react";
// useLocalSearchParams: obtiene los datos que envió la pantalla anterior (request_screen)
// useRouter: permite navegar a otra pantalla
import { useLocalSearchParams, useRouter } from "expo-router";
// Botón reutilizable del proyecto
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

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
    phone?: string;
  }>();
  // router se usa para navegar al presionar "Volver al inicio"
  const router = useRouter();
  const ticket = useMemo(() => {
    return "SL # -" + Math.floor(100000 + Math.random() * 900000);
  }, []);

  /* ===== RENDER ===== */
  return (
    // Contenedor principal: centrado vertical y horizontal, fondo azul claro
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={64} color="#22C55E"  />
      {/* Mensaje principal de éxito */}
      <Text style={styles.title}>Solicitud enviada con éxito</Text>
      
      <View style={styles.ticketBox}>
        <Text style={styles.ticketText}>Ticket: {ticket}</Text>
      </View>
      {/* Indica qué servicio se solicitó */}
      <Text style={styles.subtitle}>
        Tu solicitud de {params.servicio} ha sido registrada, 
        en contados minutos te contactaremos para gestionar tu solicitud.
      </Text>
      <View style={styles.card}>
        {/* Muestra la fecha que eligió el usuario */}
        <Text style={styles.detail}>
          <Text style={styles.bold}> Fecha: </Text>
          {params.date}
        </Text>


        <Text style={styles.detail}>
          <Text style={styles.bold}>Hora: </Text>
          {params.time}
        </Text>


        <Text style={styles.detail}>
          <Text style={styles.bold}>Dirección: </Text>
          {params.address}
        </Text>


        <Text style={styles.detail}>
          <Text style={styles.bold}>Whatsapp: </Text>
          {params.phone}
        </Text>

        {params.notes ? (
          <Text style={styles.detail}>
            <Text style={styles.bold}>Notas: </Text>
            {params.notes}
          </Text>
        ) : null}
      </View>

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
  ticket: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 20,
  width: "100%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
  borderWidth: 1,
  borderColor: "#DBEAFE",
  marginTop: 16,

  },
  ticketBox: {
    backgroundColor: "#DBEAFE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,

  },
  ticketText: {
    fontWeight: "bold",
    color: "#1D4ED8",  },

  bold: {
    fontWeight: "bold",
  },
});
