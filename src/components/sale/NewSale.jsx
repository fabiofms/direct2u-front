import React, {useState, useEffect} from 'react'
import ProductsList from './ProductsList'


export const NewSale = props => {
    const [products, setProducts] = useState(); // products from database
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [formProduct, setFormProduct] = useState({
        quantity: '',
        product: ''
    });
    const [formSale, setFormSale] = useState({
        client: '',
        email: ''
    });

    const { quantity, product } = formProduct
    const { client, email } = formSale

    // Get products for user
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
                if ( responseData.length > 0){
                    setFormProduct(old => {return {...old, product: responseData[0]._id}})
                }
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
            
        };
        sendRequest();
    }, [])


    const onChangeSale = e => setFormSale({...formSale, [e.target.name]: e.target.value})

    const onChangeProduct = e => {
        setFormProduct({...formProduct, [e.target.name]: e.target.value})
    }

    const onSubmitSale = async e => {
        e.preventDefault();
        setError(oldError => []);
        const newSaleData = {
            client, email, products: selectedProducts
        }
        try {
            setIsLoading(true)
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/sale',
                {
                method: 'POST',
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
        //console.log(props.errors)
        return (props.errors.map((err, index) => 
                <p key={index} style={{color: 'red'}}>{err}</p>)
        );
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Add New Sale</h1>
            <ErrElements errors = {error} />

            <form className="form" onSubmit={e => onSubmitSale(e)}>
                <div className="form-group">
                <input type="text" placeholder="Client Name" name="client"
                    value={client} 
                    onChange={e => onChangeSale(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Email" name="email"
                    value={email} 
                    onChange={e => onChangeSale(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Add Sale" />
            </form>

            <form className="form" onSubmit={e => {onSubmitProduct(e)}}>
                <p>Choose a Product:</p>
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
            
            {products && <ProductsList items={selectedProducts} onDelete={onDeleteHandler}
            history={props.history} />}
            
        </section>
    )
}

export default NewSale;