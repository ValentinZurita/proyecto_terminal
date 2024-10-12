import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/login">Login</Link>
      <Link to="/registro">Registro</Link>
    </nav>
  );
}

export default Navbar;
