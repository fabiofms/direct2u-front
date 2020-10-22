import React from 'react';

const ProductItem = props => {

    return(
        <li>
            <div className="post bg-white p my-1">
                <p>
                    Product: {props.name}
                </p>
                <p>
                Quantity: {props.quantity}
                </p>
                <p>
                    <button      
                        type="button"
                        className="btn btn-dark"
                        onClick={() => props.onDelete(props.id)}>
                        Delete
                    </button>
                </p>
                
            </div>
        </li>
    );
};

export default ProductItem;
