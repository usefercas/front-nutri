import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo de estilos CSS

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> {/* Cambia bg-dark a bg-primary */}
      <div className="container">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Acceso</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registro</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users/me">Perfil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">Crear</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
