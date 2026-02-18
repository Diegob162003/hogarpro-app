export const createRequest = async (data: any) => {
  try {
    console.log("Enviando request al backend con datos:", data);

    const response = await fetch("http://10.76.35.247:5000/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Si la respuesta no es 2xx, tiramos error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response del backend:", responseData);

    return {
      success: true,
      message: responseData.message || "Solicitud enviada correctamente",
    };
  } catch (err: any) {
    console.error("Error enviando request:", err.message);
    return {
      success: false,
      message: err.message || "Error desconocido al enviar la solicitud",
    };
  }
};
