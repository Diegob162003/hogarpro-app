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
        { text: "• Limpieza profunda de cocina (estufa, mesones y superficies)\n" },
        { text: "• Deshecho de basuras\n" },
        { text: "• Organización ligera de espacios (alcobas, espacios sociales)\n\n" },
        
        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Limpieza post-obra\n" },
        { text: "• Lavado de alfombras o tapetes, lavado de cobijas y/o ropa\n" },
        { text: "• Lavado profundo de techos o paredes\n" },
        { text: "• Uso de químicos o equipos especiales\n" },
        { text: "• Desinfección profunda\n" },
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
        { text: "• Organización básica del área de cocina al finalizar\n\n" },
        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Servicio de chef profesional\n" },
        { text: "• Menús gourmet o especializados\n" },
        { text: "• Catering o eventos\n" },
        { text: "• Compra de ingredientes\n" },
        { text: "• Preparaciones complejas o técnicas avanzadas\n" },
        { text: "• Servicio de mesero\n" },
      ],
    },
    {
      titulo: "Lavandería / Planchado",
      descripcion: "Lavado y planchado de ropa en casa.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Lavado de ropa doméstica\n"  },
        { text: "• Planchado de prendas básicas\n"  },
        { text: "• Separación básica de ropa\n"  },
        { text: "• Entrega de la ropa limpia y organizada\n\n"  },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Lavado industrial\n"  },
        { text: "• Prendas delicadas o de alto valor\n"  },
        { text: "• Ropa con tratamientos especiales\n"  },
        { text: "• Servicio de tintorería\n"  },
        { text: "• Arreglos o modificaciones de ropa\n"  },


        
      ],
    },
    {
      titulo: "Reparaciones domésticas",
      descripcion: "Arreglos básicos del hogar.",
      detalle: [
        { text: "¿Qué SÍ incluye?\n", bold: true },
        { text: "• Fugas pequeñas de agua. \n"  },
        { text: "• Ajustes simples de tornillería, carpintería, sistema electrico, cambio de bombillos. \n"  },
        { text: "• Cambio de guardas, chapas o cerraduras. \n"  },
        { text: "• Reparaciones menores de paredes, tuberías tapadas, cambio de manijas, lubricación de partes moviles\n\n" },

        { text: "¿Qué NO incluye?\n", bold: true },
        { text: "• Trabajos técnicos especializados\n"  },
        { text: "• Pintura completa de paredes, pisos, techos, etc.\n"  },
        { text: "• Materiales necesarios para las reparaciones (estos corren por cuenta del cliente)\n"  },
        { text: "• Fugas de gas natural o fluidos peligrosos\n"  },
        { text: "• Arreglos complejos de chapas o cerraduras\n"  },,
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
              {/* Flecha sutil */}
              <Text style={styles.arrow}>›</Text>
            </View>

            <Text style={styles.cardDescription}>{servicio.descripcion}</Text>

            <TouchableOpacity onPress={() => setSelectedService(servicio)}>
              <Text style={styles.verMas}>Ver más</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal descripción completa */}
      <Modal visible={!!selectedService} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalTitle}>{selectedService?.titulo}</Text>

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
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Cerrar</Text>
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
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 6,
    textAlign: "center",
    color: "#6b7280",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
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
    maxHeight: "70%", // Altura máxima para scroll
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
    backgroundColor: "#2f80ed",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
});
