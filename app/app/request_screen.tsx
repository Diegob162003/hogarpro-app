/* ===== IMPORTS ===== */

// Helper para verificar si todos los campos requeridos están completos
function isFormValid({ date, time, address }: { date: string; time: string; address: string }) {
  return !!date && !!time && !!address;
}

// React: hook para guardar el estado del formulario
import { useState } from "react";

// React Native: componentes para construir la interfaz
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";

// Expo Router: navegación y parámetros entre pantallas
import { useLocalSearchParams, useRouter } from "expo-router";

// Iconos
import { Ionicons } from "@expo/vector-icons";

// Función para enviar solicitudes al backend Flask
import { createRequest } from "../services/api";

// Biblioteca para seleccionar fecha y hora
import DateTimePicker from "@react-native-community/datetimepicker";

// Componentes propios del proyecto
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ===== TIPOS ===== */
export interface RequestData {
  date: string;
  time: string;
  address: string;
  notes: string;
  phone: string;
}

/* ===== COMPONENTE PRINCIPAL ===== */
export default function RequestScreen() {

  /* --- Datos recibidos de pantalla anterior --- */
  const { servicio, plan, precio } = useLocalSearchParams<{
    servicio?: string;
    plan?: string;
    precio?: string;
  }>();

  const router = useRouter();
  const servicioStr = String(servicio ?? "");

  /* --- Estado del formulario --- */
  const [formData, setFormData] = useState<RequestData>({
    date: "",
    time: "",
    address: "",
    notes: "",
    phone: "",
  });

  /* --- Estados para pickers --- */
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  /* --- Enviar formulario --- */
  // Ahora envía datos al backend antes de navegar
  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Llena todos los campos requeridos");
      return;
    }
  
    const result = await createRequest({
      service: servicioStr,
      plan: plan,
      price: precio,
      date: formData.date,
      hour: formData.time,
      address: formData.address,
      phone: formData.phone,
      notes: formData.notes,
    });
  
    if (result.success) {
      router.push({
        pathname: "/confirmation",
        params: { ...formData, servicio: servicioStr, plan, precio },
      });
    } else {
      alert("Error: " + result.message);
    }
  };
  
  
  

  /* --- Actualizar campos del formulario --- */
  const handleChange = (field: keyof RequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* --- Selección de fecha --- */
  const handleSelectDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      handleChange("date", `${yyyy}-${mm}-${dd}`);
    }
  };

  /* --- Selección de hora --- */
  const handleSelectTime = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hh = String(selectedTime.getHours()).padStart(2, "0");
      const min = String(selectedTime.getMinutes()).padStart(2, "0");
      handleChange("time", `${hh}:${min}`);
    }
  };

  /* --- Validación --- */
  const isFormValid =
    !!formData.date &&
    !!formData.time &&
    !!formData.address &&
    !!formData.phone;

  /* ===== RENDER ===== */
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>

          {/* Header */}
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

          {/* Información del plan */}
          <View style={styles.planBox}>
            <Text style={styles.planText}>
              Plan: <Text style={styles.planBold}>{plan}</Text>
            </Text>

            <Text style={styles.planText}>
              Precio: <Text style={styles.planBold}>{precio}</Text>
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>

            {/* Fecha */}
            <View style={styles.field}>
              <Label>Fecha</Label>
              <TouchableOpacity
                style={styles.selectTouchable}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.selectText, !formData.date && styles.selectPlaceholder]}>
                  {formData.date || "Selecciona una fecha"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.date ? new Date(formData.date) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleSelectDate}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Hora */}
            <View style={styles.field}>
              <Label>Hora</Label>
              <TouchableOpacity
                style={styles.selectTouchable}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={[styles.selectText, !formData.time && styles.selectPlaceholder]}>
                  {formData.time || "Selecciona una hora"}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleSelectTime}
                />
              )}
            </View>

            {/* Dirección */}
            <View style={styles.field}>
              <Label>Dirección completa</Label>
              <Input
                placeholder="Ingresa tu dirección"
                value={formData.address}
                onChangeText={(v) => handleChange("address", v)}
              />
            </View>

            {/* Teléfono */}
            <View style={styles.field}>
              <Label>Número de WhatsApp</Label>
              <Input
                placeholder="Ej. 3123456789"
                value={formData.phone}
                onChangeText={(v) => handleChange("phone", v)}
              />
            </View>

            {/* Notas */}
            <View style={styles.field}>
              <Label>Notas adicionales</Label>
              <Textarea
                placeholder="Detalles adicionales..."
                value={formData.notes}
                onChangeText={(v) => handleChange("notes", v)}
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Botón */}
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
  container: { flex: 1, backgroundColor: "#EFF6FF" },
  scrollContent: { flexGrow: 1, padding: 24, paddingBottom: 40 },
  content: { maxWidth: 480, width: "100%", alignSelf: "center" },

  header: { marginBottom: 24, paddingTop: 8 },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 16,
    marginLeft: -4,
  },

  backButtonPressed: { opacity: 0.7 },

  backText: { fontSize: 16, color: "#374151", marginLeft: 8 },

  title: { fontSize: 24, fontWeight: "bold", color: "#2563EB", marginBottom: 8 },

  subtitle: { fontSize: 16, color: "#6B7280" },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  field: { marginBottom: 4 },

  selectTouchable: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
    marginBottom: 16,
  },

  selectText: { fontSize: 16, color: "#111827" },

  selectPlaceholder: { color: "#9CA3AF" },

  submitButton: { width: "100%", paddingVertical: 18 },

  planBox: {
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },

  planText: { color: "#1F2937", fontSize: 15 },

  planBold: { fontWeight: "bold", color: "#2563EB" },
});
