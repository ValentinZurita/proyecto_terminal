// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { currentUser, role, logout } = useAuth();

  // Obtener solo el primer nombre del usuario
  const displayName = currentUser
    ? (currentUser.displayName || currentUser.email).split(" ")[0]
    : "";

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Inicio
        </Link>
        <Link to="/productos" className={styles.navLink}>
          Productos
        </Link>
        <Link to="/contacto" className={styles.navLink}>
          Contacto
        </Link>
      </div>
      {currentUser ? (
        <div className={styles.userInfo}>
          {/* Muestra el rol y el nombre de usuario */}
          <span className={styles.userRole}>
            {role === "admin" ? `Admin:` : ""}
          </span>
          <span className={styles.userName}>{displayName}</span>
          {/* Enlace para el Dashboard */}
          <Link to="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          {/* Enlace para el Admin Panel solo si es Admin */}
          {role === "admin" && (
            <Link to="/admin/manage-users" className={styles.navLink}>
              Admin Panel
            </Link>
          )}
          {/* Botón de Cerrar Sesión */}
          <button onClick={logout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className={styles.navLinks}>
          <Link to="/login" className={styles.navLink}>
            Iniciar Sesión
          </Link>
          <Link to="/registro" className={styles.navLink}>
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
