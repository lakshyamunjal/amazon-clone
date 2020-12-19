import React from 'react';
import classes from './OrderElement.module.css';
import moment from "moment";        // used for timestamps
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import ProductPrice from '../ProductPrice';
import hash from 'object-hash';

function OrderElement({ orderDetails }) {
    return (
        <div className={classes.OrderElement}>
            <h2>Order</h2>
            {/* data is the name of key that contains the data fetched from Firebase */}
            <p>{moment.unix(orderDetails.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p>
                <small className={classes.Id}><strong>Order Id:</strong> {orderDetails.id}</small>
            </p>
            {/* One Order can have multiple items, so we need to loop through every item
                Basket is saved to the database at time of successfull payment! */}
            {orderDetails.data.basket?.map(item => {
                return (
                    <CheckoutProduct
                        key={hash(item.id + Math.random()) }
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hideButton={true}
                    />
                );
            })}

            {/* / 100 because while creating a payment request amount is specified in paise(smallest subunit of INR). */}
            <p className={classes.OrderTotal}>Order total: <ProductPrice price={orderDetails.data.amount / 100} /></p>
        </div>
    )
}

export default OrderElement
