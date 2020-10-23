import React from 'react'
import ClientItem from './ClientItem'

const ClientsList = props => {
    if(props.items.length === 0){
        return <div className='center'>
            <h2>No clients registered.</h2>
        </div>
    }
    return (<ul 
        style={{position: 'relative'}}
        className="clients-list">
        {props.items.map(client => (
            <ClientItem
              key={client._id}
              id={client._id}
              name={client.name}
              email={client.email}
              tel={client.tel}
              address={client.address}
              onDelete={props.onDelete}
              history={props.history} />
        ))}
    </ul>);
}

export default ClientsList;