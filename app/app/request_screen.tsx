/* ===== IMPORTS ===== */
// React: hook para guardar el estado del formulario
import { useState } from "react";
// React Native: componentes para construir la interfaz
import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView,Platform} from "react-native";
// Expo Router: navegación y parámetros entre pantallas
import { useLocalSearchParams, useRouter } from "expo-router";
// Iconos (flecha para el botón Volver)
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

// Componentes propios del proyecto para el formulario
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ===== TIPOS ===== */
// Define la estructura de los datos que el usuario ingresa en el formulario
export interface RequestData {
  date: string;
  time: string;
  address: string;
  notes: string;
}

/* ===== COMPONENTE PRINCIPAL ===== */
export default function RequestScreen() {
  /* --- Datos recibidos de la pantalla anterior --- */
  // Nombre del servicio seleccionado (ej: "Limpieza", "Cocina casera")
  const { servicio } = useLocalSearchParams<{ servicio?: string }>();
  const router = useRouter();
  const servicioStr = String(servicio ?? "");

  /* --- Estado del formulario --- */
  // Guarda todo lo que el usuario escribe; se actualiza en cada cambio
  const [formData, setFormData] = useState<RequestData>({
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  /* --- Enviar formulario --- */
  // Se ejecuta al pulsar "Confirmar Solicitud"; navega a confirmación con los datos
  const handleSubmit = () => {
    if (formData.date && formData.time && formData.address) {
      router.push({
        pathname: "/confirmation",
        params: {
          servicio: servicioStr,
          date: formData.date,
          time: formData.time,
          address: formData.address,
          notes: formData.notes,
        },
      });
    }
  };

  /* --- Actualizar un campo del formulario --- */
  // Se llama cada vez que el usuario escribe; actualiza solo el campo indicado
  const handleChange = (field: keyof RequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* --- Validación --- */
  // true si fecha, hora y dirección están completos (el botón se habilita)
  const isFormValid =
    !!formData.date && !!formData.time && !!formData.address;

  /* ===== RENDER ===== */
  return (
    /* Envuelve todo para que el teclado no tape los campos al escribir */
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Permite hacer scroll si el contenido no cabe en pantalla */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Botón Volver + título de la pantalla */}
          <View style={styles.header}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#374151" />
              <Text style={styles.backText}>Volver</Text>
            </Pressable>
            <Text style={styles.title}>Solicitar {servicioStr}</Text>
            <Text style={styles.subtitle}>
              Completa los datos para tu solicitud
            </Text>
          </View>

          {/* Caja blanca con los campos del formulario */}
          <View style={styles.formCard}>
            {/* Campo: fecha del servicio */}
            <View style={styles.field}>
              <Label>Fecha</Label>
              <Input
                placeholder="YYYY-MM-DD"
                value={formData.date}
                onChangeText={(v) => handleChange("date", v)}
              />
            </View>

            {/* Campo: hora del servicio */}
            <View style={styles.field}>
              <Label>Hora</Label>
              <Input
                placeholder="HH:MM"
                value={formData.time}
                onChangeText={(v) => handleChange("time", v)}
              />
            </View>

            {/* Campo: dirección donde se realizará el servicio */}
            <View style={styles.field}>
              <Label>Dirección</Label>
              <Input
                placeholder="Ingresa tu dirección completa"
                value={formData.address}
                onChangeText={(v) => handleChange("address", v)}
              />
            </View>

            {/* Campo opcional: notas o detalles adicionales */}
            <View style={styles.field}>
              <Label>Notas adicionales (opcional)</Label>
              <Textarea
                placeholder="Información adicional sobre el servicio..."
                value={formData.notes}
                onChangeText={(v) => handleChange("notes", v)}
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Botón para enviar; deshabilitado si faltan campos obligatorios */}
          <Button
            variant="primary"
            disabled={!isFormValid}
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Confirmar Solicitud
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ===== ESTILOS ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF", // Fondo azul claro
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  content: {
    maxWidth: 480,
    width: "100%",
    alignSelf: "center", // Centra el contenido en pantallas grandes
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 16,
    marginLeft: -4,
  },
  backButtonPressed: {
    opacity: 0.7, // Efecto al presionar el botón Volver
  },
  backText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  field: {
    marginBottom: 4,
  },
  submitButton: {
    width: "100%",
    paddingVertical: 18,
  },
});


//Esta pantalla permite:
//👉 recibir el servicio elegido
//👉 llenar datos del servicio
//👉 enviar la información a la pantalla de confirmación.