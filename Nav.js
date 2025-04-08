import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="nav">
            <NavLink to="/" exact="true">Начало</NavLink>
            <NavLink to="/about">За нас</NavLink>
            <NavLink to="/services">Услуги</NavLink>
            <NavLink to="/contacts">Контакти</NavLink>
            <NavLink to="/dashboard">Профил</NavLink>
        </nav>
    );
};

export default Nav;
