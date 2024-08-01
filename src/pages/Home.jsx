import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="transparent-box">
        <div className="content-home">
          <h1 className="title">Paktlit calcula tu dieta</h1>
          <p id="parrafo">
            "Paktlit: aplicación para generar tu plan de dieta según tus necesidades y objetivos."
          </p>
        </div>
        <div className="button-home">
          <Link to="/register" className="create-button2">Regístrate</Link>
        </div>
      </div>
      <div className='iconos-container'>
        <a href="https://www.prozis.com/es/es" target="_blank" rel="noopener noreferrer">
          <img src="/prozis.png" alt="Prozis Logo" className="logo" />
        </a>
        <a href="https://www.crossfit.com/" target="_blank" rel="noopener noreferrer">
          <img src="/crosfit.png" alt="CrossFit Logo" className="logo" />
        </a>
        <a href="https://spartanfitness.es/" target="_blank" rel="noopener noreferrer">
          <img src="/spartano.png" alt="Spartan Fitness Logo" className="logo" />
        </a>
        <a href="https://fitandfood.es/" target="_blank" rel="noopener noreferrer">
          <img src="/fit.png" alt="Fit and Food Logo" className="logo" />
        </a>
      </div>
    </div>
  );
};

export default Home;
