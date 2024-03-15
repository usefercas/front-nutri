import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { logout } from '../stores/AccessTokenStore';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthFetched } = useContext(AuthContext);

  const authenticatedRoutes = [
    { to: '/profile', text: 'Perfil' },
    { to: '/create', text: 'Crear dieta' },
  ];

  const unauthenticatedRoutes = [
    { to: '/login', text: 'Acceso' },
    { to: '/register', text: 'Registro' },
  ];

  const routes = isAuthFetched && user ? authenticatedRoutes : unauthenticatedRoutes;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="logo mr-auto">
          <Link to="/">
            <img style={{ width: "2.5em", height: "2.5em", marginLeft: "1.5em" }} src="logo2.png" alt="Blog Logo" />
          </Link>
        </div>
        <Link className="navbar-brand mr-auto" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-auto" id="navbarNav">
          <ul className="navbar-nav">
            {routes.map(route => (
              <li className="nav-item" key={route.to}>
                <Link className="nav-link" to={route.to}>{route.text}</Link>
              </li>
            ))}
            {user && (
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>Cerrar sesión</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
