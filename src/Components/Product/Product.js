import React from 'react';
import { useStateValue } from '../../StateProvider';
import classes from './Product.module.css';
import { motion } from "framer-motion";
import ProductPrice from '../ProductPrice';

function Product({ id, title, imageURL, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();

    //console.log('Basket contains >>> ', basket);

    const addToBasket = () => {
        // dispatch the item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: imageURL,
            }
        });

    }

    return (
        <motion.div className={classes.Product} whileHover={{scale: 1.03, boxShadow:'10px 10px 24px 5px gray'}}>

            <div className={classes.Info}>
                {title}
                <div className={classes.Price}>
                    <ProductPrice price={price}/>
                </div>
                <div className={classes.Rating}>
                    {"⭐".repeat(rating)}
                </div>
            </div>

            <div className={classes.ImageThumbnail}>
                <img src={imageURL} alt='Product Image' className={classes.Image} />
            </div>

            <button className={classes.Button} onClick={addToBasket}>Add to basket</button>
        </motion.div>

    )
}

export default Product;