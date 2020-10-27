import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import ProductsList from './ProductsList'


export const UpdateSale = props => {
    const saleId = useParams().saleId;

    const [products, setProducts] = useState(); // products from database
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [clients, setClients] = useState(); // clients from database
    const [client, setClient] = useState();
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [formProduct, setFormProduct] = useState({
        quantity: '',
        product: ''
    });

    const { quantity, product } = formProduct

    // Get products for user
    useEffect(() => {
        const sendRequestProducts = async () => {
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
                if ( responseData.length > 0){
                    setFormProduct(old => {return {...old, product: responseData[0]._id}})
                }
                setIsLoading(false);

                // Set Selected products
                // Get sale info
                const saleResponse = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/sale/${saleId}`,
                    {
                      headers: {
                          'Content-Type': 'application/json',
                          'x-auth-token': localStorage.getItem('token')
                      }
                    }
                  );
                  const saleResponseData = await saleResponse.json()
                  
                  // Get sale selected products
                  let populatedProducts = []
                  saleResponseData.products.forEach( product =>{
                    // Add product name to object
                    const name = responseData.filter(
                        p => p._id === product.product
                    )[0].name
                    // Add complete value to populated products variable
                    populatedProducts.push({...product, name})
                  });
                  setSelectedProducts(old => {return [...old, ...populatedProducts]});
                  
                  console.log(responseData)

                  setClient(saleResponseData.client)

            } catch (err) {
                setIsLoading(false);
                setError(old => old.concat(err.message));
            }
            
        };

        const sendRequestClients = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    process.env.REACT_APP_BACKEND_URL + '/api/client',
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
                
                setClients(() => responseData);
                if ( responseData.length > 0){
                    setClient(responseData[0]._id)
                }
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(oldError => oldError.concat(err.message));
            }
            
        };

        sendRequestProducts();
        sendRequestClients();
    }, [])


    const onChangeClient = e => setClient(e.target.value)

    const onChangeProduct = e => {
        setFormProduct({...formProduct, [e.target.name]: e.target.value})
    }

    const onSubmitSale = async e => {
        e.preventDefault();
        setError(oldError => []);
        const newSaleData = {
            client, products: selectedProducts
        }
        try {
            setIsLoading(true)
            const response = await fetch(process.env.REACT_APP_BACKEND_URL +
                '/api/sale/' + saleId,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(newSaleData)
                }
            )
            const responseData = await response.json();
            if(!response.ok){
                var errors = []
                responseData.errors.forEach(element => {
                    errors.push(element.msg) 
                });
                setError(oldError => oldError.concat(errors))
                setIsLoading(false);
            } else {
                setIsLoading(false);
                props.history.push('/sales');
            }

        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setError(oldError => [...oldError, err.message 
                || 'Something went wrong, please try again'])
        }
    }

    const onSubmitProduct = e => {
        e.preventDefault()
        const selectedName = products.filter(
            prod => prod._id === product
        )[0].name
        const newProductData = {...formProduct, name: selectedName}
        setSelectedProducts(old => [...old, newProductData])
        setFormProduct(old => {return {...old, quantity: 0}})
    }

    const onDeleteHandler = id => {
        setSelectedProducts(old => old.filter(prod => id !== prod.product))
    }

    const ErrElements = props => {
        return (props.errors.map((err, index) => 
                <p key={index} style={{color: 'red'}}>{err}</p>)
        );
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Update Sale</h1>
            <ErrElements errors = {error} />

            <form className="form" onSubmit={e => onSubmitSale(e)}>
                <input type="submit" className="btn btn-green" value="Update Sale" />
                <button type="submit" className="btn btn-primary"
                onClick={() => props.history.push('/sales')}>Cancel</button>
                <p className="lead text-dark">Choose a Client:</p>
                    {clients && client && <select
                        name="client"
                        value={client} 
                        onChange={e => onChangeClient(e)}>
                    {clients.map( client => {
                        return (<option 
                            key={client._id} 
                            value={client._id}>
                            {client.name}
                        </option>)
                    })}
                </select>}
            </form>

            <form className="form" onSubmit={e => {onSubmitProduct(e)}}>
                <p className="lead text-dark">Choose a Product:</p>
                    {products && <select
                        name="product"
                        value={product} 
                        onChange={e => onChangeProduct(e)}>
                    {products.map( product => {
                        return (<option 
                            key={product._id} 
                            value={product._id}>
                            {product.name}
                        </option>)
                    })}
                </select>}
                <div className="form-group">
                <input type="text" placeholder="Quantity" name="quantity"
                    value={quantity}
                    onChange={e => onChangeProduct(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Add Product" />
            </form>
            
            {products && selectedProducts && <ProductsList items={selectedProducts} onDelete={onDeleteHandler}
            history={props.history} />}
            
        </section>
    )
}

export default UpdateSale;