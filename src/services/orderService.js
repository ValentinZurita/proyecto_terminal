// src/services/orderService.js
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Crear un nuevo pedido.
 * @param {Object} order 
 * @returns {Promise<string>} ID del pedido.
 */
export const createOrder = async (order) => {
  const ordersCol = collection(db, 'orders');
  const docRef = await addDoc(ordersCol, order);
  return docRef.id;
};

/**
 * Obtener pedidos de un usuario.
 * @param {string} userId 
 * @returns {Promise<Array>} Lista de pedidos.
 */
export const getUserOrders = async (userId) => {
  const ordersCol = collection(db, 'orders');
  const q = query(ordersCol, where('userId', '==', userId));
  const orderSnapshot = await getDocs(q);
  const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orderList;
};

/**
 * Obtener todos los pedidos (solo para admins).
 * @returns {Promise<Array>} Lista de pedidos.
 */
export const getAllOrders = async () => {
  const ordersCol = collection(db, 'orders');
  const orderSnapshot = await getDocs(ordersCol);
  const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orderList;
};

/**
 * Actualizar el estado de un pedido.
 * @param {string} orderId 
 * @param {Object} updatedData 
 * @returns {Promise<void>}
 */
export const updateOrder = async (orderId, updatedData) => {
  const orderDoc = doc(db, 'orders', orderId);
  await updateDoc(orderDoc, updatedData);
};