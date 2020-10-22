import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="u1/products" exact>Products</NavLink>
            </li>
            <li>
                <NavLink to="/u1/clients" exact>Clients</NavLink>
            </li>
            <li>
                <NavLink to="/u1/sales" exact>Sales</NavLink>
            </li>
            <li>
                <NavLink to="/u1/prices" exact>Prices</NavLink>
            </li>
            <li>
                <NavLink to="/u1/companies" exact>Companies</NavLink>
            </li>
            <li>
                <NavLink to="/auth" exact>Authenticate</NavLink>
            </li>

        </ul>
    );
}

export default NavLinks;