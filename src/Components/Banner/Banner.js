import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import banner1 from '../../Images/banner1.jpg';
// import banner2 from '../../Images/banner2.jpg';
// import banner3 from '../../Images/banner3.jpg';
import classes from './Banner.module.css';

function Banner() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_TandavTrailerDate/a60230bb-dfab-49e9-a2ef-b2a5f7b93a7d._UR3000,600_SX1500_FMwebp_.jpg" className={classes.Banner} alt="image1" />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_EnglishAlwaysOnPhase2V2/27e7ef5a-21be-4666-b275-30d7d42af51b._UR3000,600_SX1500_FMwebp_.jpg" alt="image2" className={classes.Banner} />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_IN_Batman/en_us-hero_in_batman-3000-600._UR3000,600_SX1500_FMwebp_.jpg" alt="image3" className={classes.Banner} />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/PV_IN_Familymanlanguagev1/4e2024af-b48a-4fbe-9839-ac7f5efa39f8._UR3000,600_SX1500_FMwebp_.jpg" alt="image4" className={classes.Banner} />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img
                        src="https://m.media-amazon.com/images/G/01/digital/video/sonata/PV_IN_LaalKaptaan/c253ad35-7c6d-4d44-a119-6b35a01cb058._UR3000,600_SX1500_FMwebp_.jpg" alt="image5" className={classes.Banner} />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Banner;
