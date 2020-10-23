import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/auth-context';

const MainNavigation = props => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to="/">
                <i className="fas fa-code"></i> Direct2U
            </Link>
        </h1>
        <ul>
            {!auth.isLoggedIn && 
                <li><Link to="/register">Register</Link></li>
            }
            {!auth.isLoggedIn && 
                <li><Link to="/login">Login</Link></li>
            }
            {auth.isLoggedIn && 
                <li><Link to="/clients">Clients</Link></li>
            }
            {auth.isLoggedIn && 
                <li><Link to="/products">Products</Link></li>
            }
            {auth.isLoggedIn && 
                <li><Link to="/sales">Sales</Link></li>
            }
            {auth.isLoggedIn &&
                <li><button onClick={auth.logout}>LOGOUT</button></li>
            }
        </ul>
        </nav>
    );
};

export default MainNavigation;