import React, {useState, useEffect} from 'react'

import ClientsList from './ClientsList'

const Clients = props => {
    const [clients, setClients] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const newHandler = () => {
        props.history.push('/client/new');
    }

    const onDeleteHandler = deletedClientId => {
        setClients(prevClients => 
            prevClients.filter(client => client._id !== deletedClientId)
        );
        console.log(clients)
    }

    useEffect(() => {
        const sendRequest = async () => {
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
            Clients
        </h1>
        <button
            onClick={newHandler} 
            className='btn btn-green'>New Client</button>
        {clients && <ClientsList items={clients} onDelete={onDeleteHandler}
            history={props.history} />}
    </section>
}

export default Clients;
