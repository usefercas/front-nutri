import React from 'react';
import './Home.css'; // Importa tu archivo CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">Bienvenido a la página de inicio</h1>
        <p>Este es un ejemplo de un componente Home en React</p>
      </div>
      <div className="button-container">
        <button className="create-button">Crear recetas</button>
      </div>
    </div>
  );
};

export default Home;



