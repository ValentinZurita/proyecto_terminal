// src/services/userService.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Obtener datos de un usuario por su UID.
 * @param {string} uid 
 * @returns {Promise<Object>} Datos del usuario.
 */
export const getUserData = async (uid) => {
  const userDoc = doc(db, 'users', uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('Usuario no encontrado');
  }
};

/**
 * Crear o actualizar datos de un usuario.
 * @param {string} uid 
 * @param {Object} data 
 * @returns {Promise<void>}
 */
export const setUserData = async (uid, data) => {
  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, data, { merge: true });
};