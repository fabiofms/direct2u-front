import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import { AuthContext } from '../../context/auth-context';

export const Landing = () => {
    const auth = useContext(AuthContext);
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">
                    Direct2U
                </h1>
                <p className="lead">
                    A Direct Sales Management Plattaform
                </p>
                <div className="buttons">
                    {!auth.isLoggedIn &&
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>}
                    {!auth.isLoggedIn &&
                        <Link to="/login" className="btn btn-light">Login</Link>}
                </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;