import { View, Text, StyleSheet } from "react-native";
import { useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

export default function Confirmation() {
  const params = useLocalSearchParams<{
    servicio?: string;
    plan?: string;
    precio?: string;
    date?: string;
    time?: string;
    address?: string;
    notes?: string;
    phone?: string;
  }>();

  const router = useRouter();

  const ticket = useMemo(() => {
    return "SL # -" + Math.floor(100000 + Math.random() * 900000);
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={64} color="#22C55E" />

      <Text style={styles.title}>Solicitud enviada con éxito</Text>

      <View style={styles.ticketBox}>
        <Text style={styles.ticketText}>Ticket: {ticket}</Text>
      </View>

      <Text style={styles.subtitle}>
        Tu solicitud de {params.servicio} ha sido registrada,
        en contados minutos te contactaremos para gestionar tu solicitud.
      </Text>

      {/* ===== TARJETA PLAN ===== */}
      <View style={styles.planCard}>
        <Text style={styles.cardTitle}>Plan seleccionado</Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Plan: </Text>
          {params.plan}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Precio: </Text>
          {params.precio}
        </Text>
      </View>

      {/* ===== TARJETA DATOS ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información del servicio</Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Fecha: </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#EFF6FF",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },

  detail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },

  button: {
    marginTop: 24,
    minWidth: 200,
  },

  /* TARJETA INFO SERVICIO */
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
    borderWidth: 2,
    borderColor: "#2563EB",
    marginTop: 12,
  },

  /* TARJETA PLAN */
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    borderWidth: 2,
    borderColor: "#2563EB",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 8,
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
    color: "#1D4ED8",
  },

  bold: {
    fontWeight: "bold",
  },
});
