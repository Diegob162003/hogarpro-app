import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* HEADER: Logo como fondo */}
        <ImageBackground
          source={require("../assets/images/LogoHogarPro.png")}
          style={styles.headerBackground}
          resizeMode="cover"
        />

        {/* FORM con lema dentro */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>
            Te echamos una mano en tu casa ¡déjanos ser tu mejor opción!
          </Text>

          <TextInput
            placeholder="Correo electrónico"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // ya no dejamos azul
  },

  headerBackground: {
    height: 200, // altura justa para el logo
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    marginTop: 20, // hace que la tarjeta se pegue al logo sin dejar espacio
  },

  subtitle: {
    color: "#2563EB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    color: "#2563EB",
    marginTop: 10,
  },
});
