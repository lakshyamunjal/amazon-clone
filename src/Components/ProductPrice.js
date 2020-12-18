import React from 'react';
import CurrencyFormat from 'react-currency-format';

function ProductPrice({ price }) {
    return (
        <CurrencyFormat renderText={(value) => <strong>{'\u20B9'}{value}</strong>}
            decimalScale={2}
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            thousandSpacing={'2s'}
        />
    )
}

export default ProductPrice;