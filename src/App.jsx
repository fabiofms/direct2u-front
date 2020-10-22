import React, { useState, useCallback } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import NewProduct from './components/product/NewProduct'
import Products from './components/product/Products'
import UpdateProduct from './components/product/UpdateProduct'

import NewSale from './components/sale/NewSale'
import Sales from './components/sale/Sales'
import UpdateSale from './components/sale/UpdateSale'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Landing from './shared/components/Landing/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthContext } from './shared/context/auth-context'
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            <Router>
            <MainNavigation />
            {isLoggedIn ? <Switch>
                    <Route path='/product/new' exact component={NewProduct} />
                    <Route path='/products' exact component={Products} />
                    <Route path='/product/:productId' exact component={UpdateProduct} />
                    <Route path='/sale/new' exact component={NewSale} />
                    <Route path='/sales' exact component={Sales} />
                    <Route path='/sale/:saleId' exact component={UpdateSale} />
                    <Route path='/' exact component={Landing} />
                    <Redirect to='/' />
                </Switch>
                :
                <Switch>
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/' exact component={Landing} />
                    <Redirect to='/' />
                </Switch>}
            </Router>
        </AuthContext.Provider>
    );
    
}

export default App;