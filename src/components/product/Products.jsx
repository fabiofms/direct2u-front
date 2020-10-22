import React, {useState, useEffect} from 'react'

import ProductsList from './ProductsList'

const Products = props => {
    const [products, setProducts] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const newHandler = () => {
        props.history.push('/product/new');
    }

    const onDeleteHandler = deletedProductId => {
        setProducts(prevProducts => 
            prevProducts.filter(product => product._id !== deletedProductId)
        );
        console.log(products)
    }

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    process.env.REACT_APP_BACKEND_URL + '/api/product',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        }
                    }
                );
    
                const responseData = await response.json();
                
                if(!response.ok) {
                    throw new Error(responseData.msg)
                }
                
                setProducts(() => responseData);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
            
        };
        sendRequest();
    }, [])
    return <section className="container">
        <h1 className="large text-primary">
            Products
        </h1>
        <button
            onClick={newHandler} 
            className='btn btn-green'>New Product</button>
        {products && <ProductsList items={products} onDelete={onDeleteHandler}
            history={props.history} />}
    </section>
}

export default Products;
