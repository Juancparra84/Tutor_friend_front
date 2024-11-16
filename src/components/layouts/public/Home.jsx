
//import React from 'react';
import banner from '../../../assets/img/banner1.jpg';
import '../../../assets/css/styles.css';

export const Home = () => {
  return (
    <div className="home-container">
        <h1> TUTOR FRIEND</h1>
        <p>Tiene el propósito es conectar a personas interesadas en adquirir conocimientos sobre la industria del software, con tutores capacitados para formar una comunidad de aprendizaje en tecnología.</p>
        <div className="banner__img" > 
        <img src={ banner } ></img>
        </div>
        </div>
  )
};

export default Home;