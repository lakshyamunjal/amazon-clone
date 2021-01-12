import React from 'react';
import CurrencyFormat from 'react-currency-format';
import classes from './ProductPrice.module.css';

// return the price of an item with correct placed , in INR
function ProductPrice({ price }) {
    return (
        <div className={classes.Price}>
            <CurrencyFormat renderText={(value) => <strong>{'\u20B9'}{value}</strong>}
                decimalScale={2}
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                thousandSpacing={'2s'}
            />
        </div>
    )
}

export default ProductPrice;
