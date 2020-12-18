import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../../Images/banner1.jpg';
import banner2 from '../../Images/banner2.jpg';
import banner3 from '../../Images/banner3.jpg';
import classes from './Banner.module.css';

function Banner() {
    return (
        <div className={classes.Banner}>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img src={banner1} alt="image1" className={classes.Image} />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img src={banner2} alt="image2" className={classes.Image}/>
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img src={banner3} alt="image3" className={classes.Image}/>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Banner;
