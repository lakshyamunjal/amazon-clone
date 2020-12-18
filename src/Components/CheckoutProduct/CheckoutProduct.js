import React from 'react';
import { useStateValue } from '../../StateProvider';
import ProductPrice from '../ProductPrice';
import Button from 'react-bootstrap/Button';
import classes from './CheckoutProduct.module.css';

function CheckoutProduct({ id, image, title, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    }

    return (
        <div className={classes.CheckoutProduct}>
            <div className={classes.ImageColumn}>
                <img src={image} className={classes.Image} />
            </div>
            <div className={classes.Information}>
                <strong style={{fontSize: '1.2vw'}}>{title}</strong>
                <ProductPrice price={price} />
                <span style={{fontSize: '1.2vw'}}>{"⭐".repeat(rating)}</span>
                <Button className={classes.RemoveButton} onClick={removeFromBasket}>Remove Item</Button>
            </div>
        </div>
    )
}

export default CheckoutProduct;
