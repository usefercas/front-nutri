import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { logout } from '../stores/AccessTokenStore'; // Importa la función de logout

const Navbar = () => {
  const { user, isAuthFetched } = useContext(AuthContext);

  const authenticatedRoutes = [
    { to: '/profile', text: 'Perfil' },
    { to: '/create', text: 'Crear' },
    // Agrega más rutas protegidas si es necesario
  ];

  const unauthenticatedRoutes = [
    { to: '/login', text: 'Acceso' },
    { to: '/register', text: 'Registro' },
    // Agrega más rutas no protegidas si es necesario
  ];

  const routes = isAuthFetched && user ? authenticatedRoutes : unauthenticatedRoutes;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> {/* Cambio en la clase para alinear a la derecha */}
          <ul className="navbar-nav">
            {routes.map(route => (
              <li className="nav-item" key={route.to}>
                <Link className="nav-link" to={route.to}>{route.text}</Link>
              </li>
            ))}
            {user && (
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>Cerrar sesión</button> {/* Llama a la función logout al hacer clic */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
