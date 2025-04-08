import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="hero-modern">
            <div className="hero-overlay">
                <div className="hero-text">
                    <h1>AutoService BG</h1>
                    <p>Качествен ремонт. Надеждност. Грижа за клиента.</p>
                    <Link to="/book">
                        <button className="hero-button">Запиши час</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
