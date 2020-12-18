import React from 'react';
import Banner from '../Banner/Banner';
import Product from '../Product/Product';
import classes from './Home.module.css';

function Home() {
    return (
        <div className={classes.home}>
            <Banner />

            {/* Products */}
            <div className={classes.row}>
                <Product id='21231' title="The Immortals of Meluha" imageURL="https://images-na.ssl-images-amazon.com/images/I/81zHwTa288L.jpg" price="250" rating="4" />
                <Product id='21141' title='Nescafe gold - 100g' imageURL='https://m.media-amazon.com/images/I/61xyIiQb9XL._AC_UL320_.jpg' price='451' rating='5' />
            </div>

            <div className={classes.row}>
                <Product />
                <Product />
                <Product />

            </div>

            <div className={classes.row}>
                <Product />
            </div>
        </div>
    )
}

export default Home;