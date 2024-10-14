// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <SEO
        title="404 - Página No Encontrada"
        description="La página que buscas no existe."
      />
      <h2>404 - Página No Encontrada</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al Inicio</Link>
    </div>
  )
}

export default NotFound
