import React, { useState } from 'react';
import '../styles/Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();
  const [clicked, setClicked] = useState(false);

  const addToBasket = () => {
    // dispatch the items into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    // Set clicked to true to trigger the animation
    setClicked(true);

    // Reset clicked state after a short delay to allow the animation to complete
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt='product-image' />
      <button
        className={clicked ? 'product__button clicked' : 'product__button'}
        onClick={addToBasket}
        onAnimationEnd={() => setClicked(false)}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
