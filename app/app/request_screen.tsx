/* ===== IMPORTS ===== */

// Helper para verificar si todos los campos requeridos están completos
function isFormValid({ date, time, address }: { date: string; time: string; address: string }) {
  return !!date && !!time && !!address;
}
// React: hook para guardar el estado del formulario
import { useState } from "react";
// React Native: componentes para construir la interfaz
import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView,Platform, Pressable, Modal, TouchableOpacity} from "react-native";
// Expo Router: navegación y parámetros entre pantallas
import { useLocalSearchParams, useRouter } from "expo-router";
// Iconos (flecha para el botón Volver)
import { Ionicons } from "@expo/vector-icons";

// Biblioteca para seleccionar fecha y hora (native)
import DateTimePicker from "@react-native-community/datetimepicker";

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
  phone: string;
}

/* ===== COMPONENTE PRINCIPAL ===== */
export default function RequestScreen() {
  /* --- Datos recibidos de la pantalla anterior --- */
  // Nombre del servicio seleccionado (ej: "Limpieza", "Cocina casera")
  const { servicio, plan, precio } = useLocalSearchParams<{
     servicio?: string;
     plan?: string;
     precio?: string;}>();

  const router = useRouter();
  const servicioStr = String(servicio ?? "");
  const isStandardPlan = plan === "Servicio Estándar";


  /* --- Estado del formulario --- */
  // Guarda todo lo que el usuario escribe; se actualiza en cada cambio
  const [formData, setFormData] = useState<RequestData>({
    date: "",
    time: "",
    address: "",
    notes: "",
    phone: "",
  });

  // Estados para mostrar/ocultar los selectores y guardar valor temporal
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // Días seleccionados para plan estándar
const [selectedDays, setSelectedDays] = useState<string[]>([]);

  /* --- Enviar formulario --- */
  // Se ejecuta al pulsar "Confirmar Solicitud"; navega a confirmación con los datos
  const handleSubmit = () => {
    if (formData.date && formData.time && formData.address && formData.phone) {
      router.push({
        pathname: "/confirmation",
        params: {
          servicio: servicioStr,
          date: formData.date,
          time: formData.time,
          address: formData.address,
          notes: formData.notes,
          phone: formData.phone,

          plan: plan,
          precio: precio,
        },
      });
    }
  };

  /* --- Actualizar un campo del formulario --- */
  // Se llama cada vez que el usuario escribe; actualiza solo el campo indicado
  const handleChange = (field: keyof RequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* --- Handlers para fecha/hora --- */
  const handleSelectDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // formatear: YYYY-MM-DD
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      handleChange("date", `${yyyy}-${mm}-${dd}`);
    }
  };

  const handleSelectTime = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      // formatear: HH:MM
      const hh = String(selectedTime.getHours()).padStart(2, "0");
      const min = String(selectedTime.getMinutes()).padStart(2, "0");
      handleChange("time", `${hh}:${min}`);
    }
  };

  /* --- Validación --- */
  // true si fecha, hora y dirección están completos (el botón se habilita)
  const isFormValid =
    !!formData.date && 
    !!formData.time && 
    !!formData.address && 
    !!formData.phone;

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

          <View style={styles.planBox}>
              <Text style={styles.planText}>
                  Plan: <Text style={styles.planBold}>{plan}</Text>
              </Text>

              <Text style={styles.planText}>
                  Precio: <Text style={styles.planBold}>{precio}</Text>
              </Text>
          </View>

          {/* Caja blanca con los campos del formulario */}
          <View style={styles.formCard}>
            {/* Campo: fecha del servicio */}
            <View style={styles.field}>
              <Label>Fecha</Label>
              <TouchableOpacity
                style={styles.selectTouchable}
                onPress={() => setShowDatePicker(true)}
                accessibilityRole="button"
                activeOpacity={0.7}
              >
                <Text style={[styles.selectText, !formData.date && styles.selectPlaceholder]}>
                  {formData.date ? formData.date : "Selecciona una fecha"}
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

            {/* Campo: hora del servicio */}
            <View style={styles.field}>
              <Label>Hora</Label>
              <TouchableOpacity
                style={styles.selectTouchable}
                onPress={() => setShowTimePicker(true)}
                accessibilityRole="button"
                activeOpacity={0.7}
              >
                <Text style={[styles.selectText, !formData.time && styles.selectPlaceholder]}>
                  {formData.time ? formData.time : "Selecciona una hora"}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={
                    formData.time
                      ? (() => {
                          // Convertir "HH:MM" a Date
                          const fakeDate = new Date();
                          const [hour, min] = formData.time.split(":");
                          fakeDate.setHours(Number(hour) || 12, Number(min) || 0, 0, 0);
                          return fakeDate;
                        })()
                      : new Date()
                  }
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleSelectTime}
                />
              )}
            </View>

            {/* Campo: dirección donde se realizará el servicio */}
            <View style={styles.field}>
              <Label>Dirección donde se realizará el servicio (completa)</Label>
              <Input
                placeholder="Ingresa tu dirección completa"
                value={formData.address}
                onChangeText={(v) => handleChange("address", v)}
              />
            </View>

            {/* Campo: teléfono del usuario */}
            <View style={styles.field}>
              <Label>Número de tu whatsapp para contactarte</Label>
              <Input
                placeholder="Ej. 3123456789"
                value={formData.phone}
                onChangeText={(v) => handleChange("phone", v)}
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
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  field: {
    marginBottom: 4,
  },
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
  selectText: {
    fontSize: 16,
    color: "#111827",
  },
  selectPlaceholder: {
    color: "#9CA3AF",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 18,
  },
  planBox: {
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  
  planText: {
    color: "#1F2937",
    fontSize: 15,
  },
  
  planBold: {
    fontWeight: "bold",
    color: "#2563EB",
  },
  
});


//Esta pantalla permite:
//👉 recibir el servicio elegido
//👉 llenar datos del servicio
//👉 enviar la información a la pantalla de confirmación.