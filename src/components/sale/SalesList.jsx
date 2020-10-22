import React from 'react'
import SaleItem from './SaleItem'

const SalesList = props => {
    if(props.items.length === 0){
        return <div className='center'>
            <h2>No sales found.</h2>
        </div>
    }
    return (<ul 
        style={{position: 'relative'}}
        className="sales-list">
        {props.items.map(sale => (
            <SaleItem
              key={sale._id}
              id={sale._id}
              client={sale.client}
              date={sale.date}
              price={sale.price}
              done={sale.done}
              quantity={sale.products.length}
              onDelete={props.onDelete}
              history={props.history} />
        ))}
    </ul>);
}

export default SalesList;