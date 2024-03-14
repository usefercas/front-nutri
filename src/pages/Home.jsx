import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import './Home.css'; // Importa tu archivo CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-home">
        <h1 className="title">Bienvenido a la página de inicio</h1>
        <p>Este es un ejemplo de un componente Home en React</p>
      </div>
      <div className="button-home">
        {/* Utiliza Link en lugar de un botón normal para redirigir a la página de registro */}
        <Link to="/register" className="create-button">Registrate</Link>
      </div>
      <h7>Comienza de manera gratuita </h7>
    </div>
  );
};

export default Home;




