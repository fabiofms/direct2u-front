import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'

import { AuthContext } from '../../shared/context/auth-context';

export const Register = () => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([]);

    const registerAction = ((auth, responseData) => {
        localStorage.setItem('token', responseData.token);
        auth.login();
    })

    const { name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        setError(oldError => []);
        if(password !== password2) {
            console.log('Passwords do not match');
        } else {
            const newUser = {
                name,
                email,
                password
            }
            try {
                setIsLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user',
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                    }
                )
                const responseData = await response.json();
                // console.log(responseData);
                if(!response.ok) {
                    localStorage.removeItem('token');
                    var errors = []
                    responseData.errors.forEach(element => {
                        errors.push(element.msg) 
                    });
                    setError(oldError => oldError.concat(errors))
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    registerAction(auth, responseData)
                }
                
            } catch (err) {
                localStorage.removeItem('token');
                console.error(err);
                setIsLoading(false);
                setError(oldError => [...oldError, err.message 
                    || 'Something went wrong, please try again'])
            }
        }
    }
    const ErrElements = props => {
        //console.log(props.errors)
        return (props.errors.map((err, index) => 
                <p key={index} style={{color: 'red'}}>{err}</p>)
        );
    }
    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <ErrElements errors = {error} />
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" 
                    value={name} 
                    onChange={e => onChange(e)}
                 />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email"
                    value={email} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={password2} 
                    onChange={e => onChange(e)}
                    
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    )
}

export default Register;