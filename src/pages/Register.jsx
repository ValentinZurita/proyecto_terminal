// src/pages/Register.jsx
import { useState } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        role: "user",
      });
    } catch (err) {
      setError("Error al registrar: " + err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Registro</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre de usuario</label>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Registrarse
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Register;
