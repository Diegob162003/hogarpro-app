// app/tabs/index.tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<any>(null);

  const servicios = [
    {
      titulo: "Limpieza detallada en tu hogar",
      descripcion: "Servicio general de limpieza del hogar.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Barrer y trapear pisos\n" },
        { text: "• Limpieza profunda de baños (lavamanos, sanitario y ducha)\n" },
        { text: "• Limpieza de mantenimiento de cocina (estufa, mesones y superficies, gabinetes)\n" },
        { text: "• Deshecho de basuras\n" },
        { text: "• Limpieza interna de nevera y horno microondas y gabinetes\n" },
        { text: "• Limpieza de ventanas (por dentro)\n" },
        { text: "• Organización ligera de espacios (alcobas, espacios sociales)\n\n" },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Limpieza post-obra\n" },
        { text: "• Lavado de alfombras o tapetes, lavado de cobijas y/o ropa\n" },
        { text: "• Lavado profundo de techos o paredes\n" },
        { text: "• Uso de químicos o equipos especiales\n" },
        { text: "• Desinfección profunda\n" },
        { text: "• Traslado o reubicación de muebles, cajas u objetos muy pesados\n" },
      ],
    },
    {
      titulo: "Cocina casera en tu domicilio",
      descripcion: "Preparación de comida casera en tu hogar.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Preparación de comidas caseras tradicionales\n" },
        { text: "• Cocina diaria para hogares o familias\n" },
        { text: "• Uso de ingredientes disponibles en el hogar\n" },
        { text: "• Preparación de almuerzos o cenas sencillas\n" },
        { text: "• Sugerencia de menú basado en los ingredientes que tengas\n" },
        { text: "• Preparación de hasta 6 porciones por sesión\n" },
        { text: "• Lavado de ollas y utensilios utilizados durante la preparación\n\n" },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Servicio de chef profesional\n" },
        { text: "• Menús gourmet o especializados\n" },
        { text: "• Catering o eventos\n" },
        { text: "• Compra de ingredientes\n" },
        { text: "• Preparaciones complejas o técnicas avanzadas\n" },
        { text: "• El servicio se presta con los utensilios disponibles en casa del cliente\n" },
        { text: "• Servicio de mesero\n\n" },
        { text: "NOTA IMPORTANTE: No nos hacemos responsables por reacciones alérgicas si el cliente no informa previamente de restricciones alimentarias\n", bold: true },
      ],
    },
    {
      titulo: "Lavandería / Planchado",
      descripcion: "Lavado y planchado de ropa en casa.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Lavado de ropa doméstica\n" },
        { text: "• Planchado de prendas básicas\n" },
        { text: "• Doblado tipo tienda\n" },
        { text: "• Guardado de ropa en su lugar\n" },
        { text: "• Separación básica de ropa\n" },
        { text: "• Uso de metodo de secado proporcionado por el cliente\n" },
        { text: "• Entrega organizada\n\n" },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Lavado industrial\n" },
        { text: "• Prendas delicadas\n" },
        { text: "• Tratamientos especiales\n" },
        { text: "• Servicio de tintorería\n" },
        { text: "• Modificaciones de ropa\n" },
      ],
    },
    {
      titulo: "Reparaciones domésticas",
      descripcion: "Arreglos básicos del hogar.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Plomería básica\n" },
        { text: "• Electricidad básica\n" },
        { text: "• Carpintería básica\n" },
        { text: "• Instalación de accesorios\n" },
        { text: "• Resane de muros\n\n" },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Trabajos técnicos especializados\n" },
        { text: "• Pintura completa\n" },
        { text: "• Materiales\n" },
        { text: "• Fugas de gas\n" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HogarPro</Text>
      <Text style={styles.subtitle}>Servicios domésticos confiables</Text>

      <ScrollView style={{ width: "100%", marginTop: 20 }}>
        {servicios.map((servicio) => (
          <TouchableOpacity
            key={servicio.titulo}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/prices_screen",
                params: { servicio: servicio.titulo },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{servicio.titulo}</Text>
              <Text style={styles.arrow}>›</Text>
            </View>

            <Text style={styles.cardDescription}>
              {servicio.descripcion}
            </Text>

            <TouchableOpacity onPress={() => setSelectedService(servicio)}>
              <Text style={styles.verMas}>Ver más</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selectedService} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalTitle}>
                {selectedService?.titulo}
              </Text>

              {selectedService?.detalle.map((line: any, index: number) => (
                <Text
                  key={index}
                  style={line.bold ? styles.boldText : styles.modalText}
                >
                  {line.text}
                </Text>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelectedService(null)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#EFF6FF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563EB",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 6,
    textAlign: "center",
    color: "#1D4ED8",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardDescription: {
    marginTop: 6,
    color: "#6b7280",
  },

  verMas: {
    marginTop: 10,
    color: "#2f80ed",
    fontWeight: "600",
  },

  arrow: {
    fontSize: 36,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  modalText: {
    color: "#4b5563",
    marginBottom: 4,
  },

  boldText: {
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 4,
  },

  modalButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
});
