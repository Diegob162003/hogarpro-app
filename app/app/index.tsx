import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = false; // O auth.currentUser
    if (userLoggedIn) {
      router.replace("/(tabs)"); // ✅ ruta correcta
    } else {
      router.replace("/login"); // ✅ ruta correcta
    }
  }, []);

  return null;
}
