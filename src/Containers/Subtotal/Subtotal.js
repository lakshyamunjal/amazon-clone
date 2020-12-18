import React, { useEffect } from 'react';
import classes from './Subtotal.module.css';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

function Subtotal(props) {
    let checkboxStatus = false;
    const [{ basket }, dispatch] = useStateValue();

    const checkboxClicked = () => {
        checkboxStatus = !checkboxStatus;
        console.log('Checked: ', checkboxStatus);
    }

    useEffect(() => {
        if (getBasketTotal(basket) != 0) {
            document.getElementById('giftCheckbox').disabled = false;
            console.log('Enable checkbox');
        }else{
            document.getElementById('giftCheckbox').disabled = true;
        }
    }, []);


    return (
        <div className={classes.Subtotal}>
            <CurrencyFormat renderText={(value) => {
                return (
                    <>
                        <p>
                            Subtotal({basket.length} items): <strong>{'\u20B9'}{value}</strong>
                        </p>
                        <small className={classes.Gift}>
                            <input type='checkbox' id='giftCheckbox'
                                className={classes.Checkbox}
                                onClick={checkboxClicked}
                                disabled={true} />This order contains a gift
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
            <Link to='/payment'>
                <Button className={classNames(classes.CheckoutButton, 'btn')}>
                    Proceed to checkout
                </Button>
            </Link>
        </div>
    )
}

export default Subtotal
