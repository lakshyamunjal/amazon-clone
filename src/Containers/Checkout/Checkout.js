import React from 'react';
import CheckoutProduct from '../../Components/CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../../StateProvider';
import Subtotal from '../Subtotal/Subtotal';
import classes from './Checkout.module.css';

function Checkout() {

    const [{ user, basket }, dispatch] = useStateValue();
    const hash = require('object-hash');

    let username = null;

    if (user && user.email) {
        username = user.email;

        // remove everything from @
        // username = username.substring(0, username.indexOf("@"));

        // username = username[0].toUpperCase() + username.substring(1);
    }

    return (
        <div className={classes.Checkout}>
            <div className={classes.OrderItems}>
                <h5 className={classes.Username}>Hello, {username ? username : " Guest"}</h5>
                <h2 className={classes.Title}>
                    Your shopping basket
                </h2>
                {
                    basket.map(item => {
                        return (
                        <CheckoutProduct
                            key={hash(item.id + Math.random())}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            rating={item.rating} />)
                    }

                    )
                }
            </div>

            <div className={classes.PaymentDetails}>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
