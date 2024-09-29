import React from 'react';
import "../styles/Subtotal.css";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const navigate = useNavigate (); 
  const [{basket}, dispatch] = useStateValue();
  
  return (
    <div className='subtotal'>

      <button onClick={e=>navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
