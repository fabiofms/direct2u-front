import React from 'react';

const SaleItem = props => {
    const handleEdit = () => {
        props.history.push('/sale/' + props.id)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URL + '/api/sale/' + props.id,
                {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );

            const responseData = await response.json();
            
            if(!response.ok) {
                throw new Error(responseData.msg)
            }
            
            props.onDelete(props.id);
            
        } catch (err) {
            //setIsLoading(false);
            //setError(err.message);
        }
    }

    return(
        <li>
            <div className="post bg-white p my-1">
                <p>
                    Date: {props.date} <br/>
                    Client: {props.client} <br/>
                    Items: {props.quantity} <br/>
                    Price: R${props.price.toFixed(2)}
                    
                </p>
                <p>
                    {/* <button      
                        type="button"
                        className="btn btn-dark"
                        onClick={handleEdit}>
                        Edit
                    </button> */}
                    <button      
                        type="button"
                        className="btn btn-dark"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </p>
                
            </div>
        </li>
    );
};

export default SaleItem;
