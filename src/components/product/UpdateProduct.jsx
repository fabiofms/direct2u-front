import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';

export const UpdateProduct = props => {
    const productId = useParams().productId;
    
    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([]);
    const { name, price } = formData;


    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}`,
              {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
              }
            );
            const responseData = await response.json()
            //setLoadedPlace(responseData.place);
            setFormData(
              {
                name: responseData.name,
                price: responseData.price 
              }
            );
    
          } catch (err) {
              console.error(err)
          }
        };
        fetchProduct();
      }, [productId, setFormData]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        setError(oldError => []);
        const updateProductData = {
            name,
            price
        }
        try {
            setIsLoading(true)
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
                '/api/product/' +  productId,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(updateProductData)
                }
            )
            const responseData = await response.json();
            console.log(responseData);
            if(!response.ok){
                var errors = []
                responseData.errors.forEach(element => {
                    errors.push(element.msg) 
                });
                setError(oldError => oldError.concat(errors))
                setIsLoading(false);
            } else {
                setIsLoading(false);
                props.history.push('/products');
            }

        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setError(oldError => [...oldError, err.message 
                || 'Something went wrong, please try again'])
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
            <h1 className="large text-primary">Update Product</h1>
            <ErrElements errors = {error} />
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Product Name" name="name"
                    value={name} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Product Price" name="price"
                    value={price} 
                    onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Update" />
                <button type="submit" className="btn btn-primary"
                onClick={() => props.history.push('/products')}>Cancel</button>
            </form>
            
        </section>
    )
}

export default UpdateProduct;