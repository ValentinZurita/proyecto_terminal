// Importamos las dependencias necesarias de Firebase Functions y Firebase Admin SDK
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializamos Firebase Admin SDK para poder usar sus servicios, como Authentication y Firestore.
admin.initializeApp();

/**
 * Función assignUserRole - Asigna un rol a un usuario
 * Esta función solo puede ser ejecutada por un usuario con rol 'admin'.
 * Es utilizada para asignar los roles 'admin' o 'user' a otros usuarios en la plataforma.
 */
exports.assignUserRole = functions.https.onCall(async (data, context) => {
  // Verificamos si el solicitante de esta función está autenticado.
  // Si no lo está, lanzamos un error de tipo 'unauthenticated'.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'El usuario debe estar autenticado para realizar esta acción.'
    );
  }

  // Obtenemos el UID (ID único de usuario) del solicitante para realizar más verificaciones de seguridad.
  const requesterUid = context.auth.uid;

  try {
    // Recuperamos la información del usuario solicitante usando su UID.
    const requester = await admin.auth().getUser(requesterUid);

    // Extraemos los Custom Claims del usuario solicitante, o usamos un objeto vacío como fallback si no existen.
    const requesterClaims = requester.customClaims || {};

    // Verificamos si el solicitante tiene el rol 'admin' en sus Custom Claims.
    // Si no tiene permiso, lanzamos un error de tipo 'permission-denied'.
    if (requesterClaims.role !== 'admin') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'El usuario no tiene permisos para realizar esta acción.'
      );
    }

    // Obtenemos el UID del usuario al que se le asignará el rol y el nuevo rol que se le asignará.
    const targetUid = data.uid;
    const newRole = data.role;

    // Validamos que los datos recibidos sean correctos:
    // Verificamos que `targetUid` y `newRole` estén presentes y que `newRole` sea 'admin' o 'user'.
    if (!targetUid || !newRole || !['admin', 'user'].includes(newRole)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Los datos proporcionados no son válidos. Asegúrate de incluir un UID y un rol válido ("admin" o "user").'
      );
    }

    // Asignamos el Custom Claim `role` al usuario objetivo usando `setCustomUserClaims`.
    await admin.auth().setCustomUserClaims(targetUid, { role: newRole });

    // Retornamos un mensaje de confirmación si el rol se asignó correctamente.
    return { message: `Rol actualizado a ${newRole} para el usuario ${targetUid}.` };
  } catch (error) {
    // En caso de un error inesperado, registramos el error en la consola para fines de depuración.
    console.error('Error asignando rol:', error);

    // Lanzamos un error de tipo 'unknown' junto con el mensaje del error capturado.
    throw new functions.https.HttpsError(
      'unknown',
      `Error al asignar el rol: ${error.message || 'Error desconocido'}`
    );
  }
});