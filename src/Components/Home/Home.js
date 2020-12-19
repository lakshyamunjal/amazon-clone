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
                <Product id='85412' title='New Apple MacBook Air (13-inch, 1.1GHz Dual-core 10th-Generation Intel Core i3 Processor, 8GB RAM, 256GB Storage) - Silver' imageURL="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-gallery3-20201110?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1603399121000" price="79990" rating="4"/>
                <Product id='75214' title='Fire TV Stick 4K with Alexa Voice Remote | Stream in 4K resolution' imageURL='https://images-na.ssl-images-amazon.com/images/I/51G8wQVB8hL._SL1000_.jpg' price="4499.00" rating="4"/>
                <Product id='21496' title='New Apple Watch Series 6 (GPS, 40mm) - Space Grey Aluminium Case with Black Sport Band' imageURL='https://images-na.ssl-images-amazon.com/images/I/719RMCQjW9L._SL1500_.jpg' price='40900' rating='5' />

            </div>

            <div className={classes.row}>
                <Product id='41125' title='Shroud Pro X Keyboard' imageURL='https://resource.logitechg.com/e_trim/w_652,ar_4:3,c_limit,q_auto:best,f_auto/w_692,h_519,c_lpad,b_rgb:2f3132,dpr_auto/content/dam/gaming/en/products/shroud/shroud-keyboard-gallery-1.png?v=1' price='11499.00' rating='5'/>
            </div>
        </div>
    )
}

export default Home;