import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; // ✅ cambiar aquí

export default function RequestScreen() {
  const { servicio } = useLocalSearchParams(); 
  const servicioStr = String(servicio ?? ""); // asegura que siempre sea string

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
      <Text style={{ textAlign: "center" }}>
        Servicio seleccionado: {servicioStr}
      </Text>
    </View>
  );
}
