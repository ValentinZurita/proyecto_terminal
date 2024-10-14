// src/pages/Products.jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para almacenar errores

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Resetear el error antes de la nueva solicitud
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setError("No hay productos disponibles.");
        }
      } catch (err) {
        // Manejo de diferentes tipos de errores
        setError("Error al obtener productos: " + (err.message || "Error desconocido"));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <SEO title="Productos - Mi E-commerce" description="Explora nuestros productos disponibles." />
      <h2>Productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p> // Mostrar mensaje de error
      ) : (
        <div>
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} width="150" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/productos/${product.id}`}>Ver Detalles</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;