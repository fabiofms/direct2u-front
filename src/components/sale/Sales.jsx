import React, {useState, useEffect} from 'react'

import SalesList from './SalesList'

const Sales = props => {
    const [sales, setSales] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const newHandler = () => {
        props.history.push('/sale/new');
    }

    const onDeleteHandler = deletedSaleId => {
        setSales(prevSales => 
            prevSales.filter(sale => sale._id !== deletedSaleId)
        );
        console.log(sales)
    }

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    process.env.REACT_APP_BACKEND_URL + '/api/sale',
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
                
                setSales(() => responseData);
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
            Sales
        </h1>
        <button
            onClick={newHandler} 
            className='btn btn-green'>New Sale</button>
        {sales && <SalesList items={sales} onDelete={onDeleteHandler}
            history={props.history} />}
    </section>
}

export default Sales;
