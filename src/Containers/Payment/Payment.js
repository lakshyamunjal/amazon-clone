import React, { useEffect, useState } from 'react';
import classes from './Payment.module.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../../Components/CheckoutProduct/CheckoutProduct';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import ProductPrice from '../../Components/ProductPrice';
import { getBasketTotal } from '../../reducer';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import { database } from '../../firebase';

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    // bootstrap spinner
    const spinner = (
        <div className="spinner-border text-light spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    );

    // used for payment functionality
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succedded, setSuccedded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState("");       // it is required to get payment from the client

    useEffect(() => {
        // generate special stripe secret which allow us to charge the customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                // Stripe excepts the total in a currencies subunits,i.e., it should be sent in paise instead of rupees
                // be it any curreny, it must be converted to its lowest form
                url: `/payments/create?total=${getBasketTotal(basket) * 100}&email=${user ? user.email : "Guest"}`,

            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
        // here basket defines that, whenever the basket will change, we will require a new client secret to accept the payment
    }, [basket]);

    console.log(`Clinet secret: ${clientSecret}`);

    const handleSubmit = async (event) => {
        // all the stripe stuff
        event.preventDefault();
        setProcessing(true);

        const cardNumber = elements.getElement(CardElement);     // CardElement is written below and it displays the Card Number input area
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumber,
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent is payment confirmation
            console.log(paymentIntent);
            
            // store order info to firebase database
            const collectionName = 'users';
            // every user can have multiple orders, so orders is a collection
            // paymentIntent.id is treated as order id
            
            database.collection(collectionName)
            .doc(user?.uid)             // this uid is got from user and it is set in App.js when user is successfully logged in. uid is supplied by Firebase on successfull login.
            .collection('orders')
            .doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created          // time of creation
            });
            
            setSuccedded(true);
            setError(null);
            setProcessing(false);
            
            // empty basket
            dispatch({
                type: 'EMPTY_BASKET',
            });

            // replace is used because we dont want user to click back button and come back to payment page again after successful
            // payment
            history.replace('/orders');
        }).catch(err => {
            
            history.push('/error');
            console.log(err);
        });
    }

    const handleChange = (event) => {
        // listen to the card number that the user is entering
        // and display any error if they occur
        if (event.error)
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
                    <h6>Delivery Address</h6>
                </div>
                <div className={classes.Address}>
                    <p className={classes.PersonInfo}>{user && user.email ? user.email : "Guest"}</p>
                    <p className={classes.PersonInfo}>123, React Lane</p>
                    <p className={classes.PersonInfo}>Facebook city</p>
                </div>
            </div>

            <div className={classes.Section}>
                <div className={classes.ReviewTitle}>
                    <h6>Review Items</h6>
                </div>
                <div className={classes.ReviewItems}>
                    {basket.map(item => {
                        return (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                style={{ marginLeft: '0' }}
                            />
                        )
                    })}
                </div>
            </div>

            <div className={classes.Section}>
                <div className={classes.Title}>
                    <h6>Payment Method</h6>
                </div>

                <div className={classes.PaymentDetails}>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <strong className={classes.CardMessage}>Do not enter real card details!(try 4242424.... in card number, 04/24 expiry, 242 as CVV, 42424 as ZIP)</strong>
                        <br/>
                        <strong className={classes.Price}>
                            Total Price: <ProductPrice price={getBasketTotal(basket)} />
                        </strong>
                        <br />
                        <div className={classes.ButtonDiv}>
                            <button
                                disabled={processing || disabled || succedded}
                                className={!disabled ? classes.PayButton : classes.DisableButton}>
                                {processing ? spinner : "Pay now"}
                            </button>
                        </div>
                    </form>
                    <div>
                        {error != null ? console.log(error.message) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
