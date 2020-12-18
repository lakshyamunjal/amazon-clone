import React, { useState } from 'react';
import classes from './Payment.module.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../../Components/CheckoutProduct/CheckoutProduct';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();

    // used for payment functionality
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = (event) => {
        // all the stripe stuff

    }

    const handleChange = (event) => {
        // listen to the card number that the user is entering
        // and display any error if they occur
        if(event.error)
            console.log(event.error.message);
            
        setDisabled(event.empty);
        setError(event.error ? event.error.message : null);
    }

    return (
        <div className={classes.Payment}>
            <h3 className={classes.Heading}>
                Checkout ({basket ? basket.length : "0"} items)
            </h3>

            <div className={classes.Section}>
                <div className={classes.Title}>
                    <h5>Delivery Address</h5>
                </div>
                <div className={classes.Address}>
                    <p style={{ 'margin': 0 }}>{user && user.email ? user.email : "Guest"}</p>
                    <p style={{ 'margin': 0 }}>123, React Lane</p>
                    <p style={{ 'margin': 0 }}>Facebook city</p>
                </div>
            </div>

            <div className={classes.Section}>
                <div className={classes.Title}>
                    <h5>Review Items and Delivery</h5>
                </div>
                <div className={classes.Items}>
                    {basket.map(item => {
                        return (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            />
                        )
                    })}
                </div>
            </div>

            <div className={classes.Section}>
                <div className={classes.Title}>
                    <h5>Payment Method</h5>
                </div>

                <div className={classes.PaymentDetails}>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment
