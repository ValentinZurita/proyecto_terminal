import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; 
import { db, functions } from "../services/firebase"; 
import SEO from "../components/SEO"; 
import { httpsCallable } from "firebase/functions"; 
import styles from "./ManageUsers.module.css"; 

const ManageUsers = () => {
  // Estados para gestionar la lista de usuarios y mostrar errores
  const [users, setUsers] = useState([]); // Almacena los datos de los usuarios obtenidos de Firestore
  const [error, setError] = useState(""); // Almacena mensajes de error, si ocurren

  // Definir una función que llama a la función Firebase 'assignUserRole'
  const assignUserRole = httpsCallable(functions, "assignUserRole");

  // useEffect se ejecuta al montar el componente y llama a 'fetchUsers' para obtener la lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Referencia a la colección 'users' en Firestore
        const usersCol = collection(db, "users");
        
        // Obtener documentos de la colección 'users'
        const userSnapshot = await getDocs(usersCol);
        
        // Mapear documentos para extraer el ID y los datos de cada usuario
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Guardar la lista de usuarios en el estado
        setUsers(userList);
      } catch (err) {
        // En caso de error, guarda el mensaje en el estado 'error'
        setError("Error al obtener usuarios: " + err.message);
      }
    };

    fetchUsers(); // Llama a la función para obtener usuarios
  }, []);

  // Función para cambiar el rol de un usuario (entre 'user' y 'admin')
  const handleRoleChange = async (userId, currentRole) => {
    // Define el nuevo rol según el rol actual del usuario
    const newRole = currentRole === "user" ? "admin" : "user";

    try {
      // Llama a la función 'assignUserRole' en Firebase con el UID y el nuevo rol
      const result = await assignUserRole({ uid: userId, role: newRole });
      console.log(result.data.message); // Mensaje de confirmación en consola

      // Actualiza el estado 'users' para reflejar el cambio de rol sin recargar la página
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (err) {
      // Guarda el error en el estado 'error' si falla el cambio de rol
      setError("Error al actualizar el rol: " + err.message);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <SEO title="Gestionar Usuarios - Admin" description="Asignar roles a los usuarios." />
      
      {/* Título del panel */}
      <h2 className={styles.header}>Gestionar Usuarios</h2>
      
      {/* Muestra mensaje de error, si existe */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Contenedor de tabla con desplazamiento horizontal si es necesario */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Muestra cada usuario como una fila en la tabla */}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className={styles.buttonContainer}>
                  {/* Botón para cambiar el rol de usuario */}
                  {user.role === "user" ? (
                    <button
                      className={`${styles.button} ${styles.promote}`}
                      onClick={() => handleRoleChange(user.id, user.role)}
                    >
                      Promover a Admin
                    </button>
                  ) : (
                    <button
                      className={`${styles.button} ${styles.demote}`}
                      onClick={() => handleRoleChange(user.id, user.role)}
                    >
                      Demover a Usuario
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;