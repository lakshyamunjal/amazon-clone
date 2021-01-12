import React, { useEffect, useState } from 'react';
import classes from './Subtotal.module.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import { useHistory } from 'react-router';

function Subtotal() {
    let checkboxStatus = false;
    const history = useHistory();
    const [{ user, basket }, dispatch] = useStateValue();
    const [isBasketTotalZero, setBasketTotalZero] = useState(true);
    
    const handleButtonClick = () => {
        // check if user is logged in, if not, move to login page
        if (user == null) {
            history.push('/login');
        } else {
            history.push('/payment');
        }
    }

    const enableCheckoutButton = (
        <button className={classes.CheckoutButton} onClick={handleButtonClick}>
            Proceed to checkout
        </button>
    );

    const disableCheckoutButton = (
        <button className={classes.DisableCheckoutButton} disabled>
            Proceed to checkout
        </button>
    );

    const checkboxClicked = () => {
        checkboxStatus = !checkboxStatus;
        console.log('Checked: ', checkboxStatus);
    }

    useEffect(() => {
        let basketTotal = getBasketTotal(basket);
        console.log("Basket total: ", basketTotal);

        if (basketTotal != 0) {
            setBasketTotalZero(false);
            document.getElementById('giftCheckbox').disabled = false;
        } else {
            setBasketTotalZero(true);
            document.getElementById('giftCheckbox').disabled = true;
        }

        //  basket in these [] state that whenever there is some change in the basket, useEffect will be executed again
    }, [basket]);


    return (
        <div className={classes.Subtotal}>
            <CurrencyFormat renderText={(value) => {
                return (
                    <>
                        <p className={classes.Message}>
                            Subtotal({basket.length} items): <strong>{'\u20B9'}{value}</strong>
                        </p>
                        <small className={classes.Gift}>
                            <input type='checkbox' id='giftCheckbox'
                                className={classes.Checkbox}
                                onClick={checkboxClicked}
                                disabled={true} /><span className={classes.Message}>This order contains a gift</span>
                        </small>
                    </>
                )
            }}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                thousandSpacing={'2s'}
            />

            {isBasketTotalZero ? disableCheckoutButton : enableCheckoutButton}

        </div>
    )
}

export default Subtotal
