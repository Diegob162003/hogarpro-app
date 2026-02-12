import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PricesScreen() {
  const router = useRouter();

  // Servicio recibido desde Home
  const params = useLocalSearchParams();
  const servicio = params.servicio as string;

  const planes = [
    {
      nombre: "Servicio Básico",
      precio: "$40.000",
      descripcion: "Servicio puntual para necesidades rápidas.",
    },
    {
      nombre: "Servicio Estándar",
      precio: "$70.000",
      descripcion: "Servicio más completo y recomendado.",
    },
    {
      nombre: "Plan Mensual",
      precio: "$240.000",
      descripcion: "Visitas periódicas con mejor precio.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Botón volver */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#374151" />
        <Text style={styles.backText}>Volver</Text>
      </Pressable>

      <Text style={styles.title}>{servicio}</Text>
      <Text style={styles.subtitle}>
        Selecciona el plan que mejor se adapte a ti
      </Text>

      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {planes.map((plan) => (
          <View key={plan.nombre} style={styles.card}>
            <Text style={styles.planName}>{plan.nombre}</Text>
            <Text style={styles.price}>{plan.precio}</Text>
            <Text style={styles.description}>{plan.descripcion}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/request_screen",
                  params: {
                    servicio,
                    plan: plan.nombre,
                    precio: plan.precio,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    padding: 20,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },

  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#374151",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,

    // ✅ mismo borde azul del proyecto
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  planName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 8,
  },

  description: {
    color: "#6B7280",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
