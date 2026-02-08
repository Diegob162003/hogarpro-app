/* ===== IMPORTS ===== */
// Stack: tipo de navegación donde las pantallas se apilan (una encima de otra)
// Permite ir "adelante" a una pantalla y "atrás" para volver
import { Stack } from "expo-router";

/* ===== LAYOUT RAÍZ ===== */
// Este archivo define la estructura de navegación de toda la app
// Es el "esqueleto" que envuelve todas las pantallas y controla cómo se muestran
export default function RootLayout() {
  return (
    /* Cada Stack.Screen = una pantalla en la app; headerShown: false oculta la barra superior por defecto */
    <Stack>
      {/* Pantalla de inicio de sesión; primera que ve el usuario si no está logueado */}
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      {/* Pantalla principal con tabs (Home + Explore); aparece después del login */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      {/* Formulario para solicitar un servicio; se abre desde Home al elegir un servicio */}
      <Stack.Screen
        name="request_screen"
        options={{ headerShown: false  }}
      />
      {/* Punto de entrada: redirect a login o tabs según si el usuario está logueado */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Pantalla de confirmación; se muestra después de enviar el formulario */}
      <Stack.Screen name="confirmation" options={{ headerShown: false }} />
    </Stack>
  );
}
