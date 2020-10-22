import React from 'react'
import ProductItem from './ProductItem'

const ProductsList = props => {
    if(props.items.length === 0){
        return <div className='center'>
            <h2>No products found.</h2>
        </div>
    }
    return (<ul 
        style={{position: 'relative'}}
        className="products-list">
        {props.items.map(product => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              onDelete={props.onDelete}
              history={props.history} />
        ))}
    </ul>);
}

export default ProductsList;