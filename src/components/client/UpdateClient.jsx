import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';

export const UpdateClient = props => {
    const clientId = useParams().clientId;
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([]);
    const { name, email, tel, address } = formData;


    useEffect(() => {
        const fetchClient = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/client/${clientId}`,
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
                email: responseData.email,
                tel: responseData.tel,
                address: responseData.address
              }
            );
    
          } catch (err) {
              console.error(err)
          }
        };
        fetchClient();
      }, [clientId, setFormData]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        setError(oldError => []);
        const updateClientData = {
            ...formData
        }
        try {
            setIsLoading(true)
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
                '/api/client/' +  clientId,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(updateClientData)
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
                props.history.push('/clients');
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
            <h1 className="large text-primary">Update Client</h1>
            <ErrElements errors = {error} />
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Client Name" name="name"
                    value={name} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Client email" name="email"
                    value={email} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Client tel" name="tel"
                    value={tel} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Client address" name="address"
                    value={address} 
                    onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Update" />
                <button type="submit" className="btn btn-primary"
                onClick={() => props.history.push('/clients')}>Cancel</button>
            </form>
            
        </section>
    )
}

export default UpdateClient;