import React from 'react'
import ProductItem from './ProductItem'

const ProductsList = props => {
    
    return (<ul 
        style={{position: 'relative'}}
        className="products-list">
        {props.items.map(product => (
            <ProductItem
              key={product.product}
              id={product.product}
              name={product.name}
              quantity={product.quantity}
              onDelete={props.onDelete}
              history={props.history} />
        ))}
    </ul>);
}

export default ProductsList;