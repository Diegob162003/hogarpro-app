import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Login */}
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />

      {/* Tabs principales */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Pantalla de precios */}
      <Stack.Screen
        name="prices_screen"
        options={{ headerShown: false }}
      />

      {/* Formulario de solicitud */}
      <Stack.Screen
        name="request_screen"
        options={{ headerShown: false }}
      />

      {/* Entrada principal */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      {/* Confirmación */}
      <Stack.Screen
        name="confirmation"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

