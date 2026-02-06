// app/tabs/index.tsx
import { StyleSheet, Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const servicios = [
    "Limpieza",
    "Cocina casera a domicilio",
    "Lavandería / Planchado",
    "Reparaciones domésticas",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HogarPro</Text>
      <Text style={styles.subtitle}>Servicios domésticos confiables</Text>

      <View style={{ marginTop: 40, width: "100%", paddingHorizontal: 20 }}>
        {servicios.map((servicio) => (
          <View key={servicio} style={{ marginBottom: 10 }}>
            <Button
              title={servicio}
              onPress={() =>
                router.push({
                  pathname: "/request_screen",
                  params: { servicio: String(servicio) }, // ✅ asegurar que sea string
                })
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 8 },
});
