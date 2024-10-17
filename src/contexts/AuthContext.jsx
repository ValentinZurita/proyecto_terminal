// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";

const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthSafe debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // Estado para almacenar el rol del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const tokenResult = await getIdTokenResult(user);
        setRole(tokenResult.claims.role || "user"); // Asigna el rol o 'user' como predeterminado
      } else {
        setRole(null); // Si no hay usuario, no hay rol
      }
      setLoading(false);
    });

    return unsubscribe; // Limpia la suscripción al desmontar
  }, []);

  // Función para cerrar sesión
  const logout = () => signOut(auth);

  const value = {
    currentUser,
    role, // Incluye el rol en el contexto
    logout, // Incluye la función de cierre de sesión
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
