// src/services/productService.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Obtener todos los productos.
 * @returns {Promise<Array>} Lista de productos.
 */
export const getProducts = async () => {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productList;
};

/**
 * Añadir un nuevo producto.
 * @param {Object} product 
 * @returns {Promise<void>}
 */
export const addProduct = async (product) => {
  const productsCol = collection(db, 'products');
  await addDoc(productsCol, product);
};

/**
 * Actualizar un producto existente.
 * @param {string} productId 
 * @param {Object} updatedProduct 
 * @returns {Promise<void>}
 */
export const updateProduct = async (productId, updatedProduct) => {
  const productDoc = doc(db, 'products', productId);
  await updateDoc(productDoc, updatedProduct);
};

/**
 * Eliminar un producto.
 * @param {string} productId 
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  const productDoc = doc(db, 'products', productId);
  await deleteDoc(productDoc);
};