// BannerCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const BannerCarousel = () => {
    return (
        <Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true}>
            <div>
                <img 
                    className="home__image"
                    src="https://m.media-amazon.com/images/I/71eJ6-zjErL._SX3000_.jpg"
                    alt="banner1"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="https://m.media-amazon.com/images/I/31-x+CdqQKL._SX1500_.jpg"
                    alt="banner2"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="https://m.media-amazon.com/images/I/71JBER9pf2L._SX3000_.jpg"
                    alt="banner3"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="https://m.media-amazon.com/images/I/61ZxL5rpLTL._SX3000_.jpg"
                    alt="banner4"
                />
            </div>
        </Carousel>
    );
};

export default BannerCarousel;
