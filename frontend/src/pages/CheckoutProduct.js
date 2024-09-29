import React from 'react'
import '../styles/CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue();
    
    const removeFromBasket = () =>{
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id, 
        })
    }

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
            {Array(rating) // array of size 5
                        .fill() // fill it with empty value
                        .map((_, i)=>( // map it and put the star
                            <p key={i}>⭐</p>
                        ))}
        </div>
        {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
        </div>
    </div>
  )
}

export default CheckoutProduct
