const admin = require("firebase-admin");

// Inicializa Firebase Admin SDK
const serviceAccount = require("./proyecto-terminal-74824-firebase-adminsdk-8hrfa-fa8eb6620c.json"); // Asegúrate de tener el archivo de credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Función para asignar rol de admin a un usuario específico
const setAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(`Rol de admin asignado al usuario con UID: ${uid}`);
  } catch (error) {
    console.error("Error al asignar el rol:", error);
  }
};

// Llama a la función con el UID del usuario
setAdminRole("c1cVd0rgJzVKlPH8c4vBmZUHJ573"); // Reemplaza con el UID del usuario