import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from './axios';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket);
      if (total > 0) {
        try {
          const response = await axios.post("/payments/create-payment-intent", {
            amount: Math.round(total * 100)
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error("Error creating payment intent:", error);
          setError("Unable to process payment. Please try again.");
        }
      }
    }

    getClientSecret();
  }, [basket])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        const orderData = {
          basket: basket,
          amount: getBasketTotal(basket),
          created: new Date().getTime()
        };

        const response = await axios.post('/orders', orderData);

        if (response.status === 201) {
          setSucceeded(true);
          setError(null);
          setProcessing(false);

          dispatch({
            type: 'EMPTY_BASKET'
          });

          navigate("/orders", { replace: true });
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(`Payment failed. ${error.message}`);
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>Checkout ({basket?.length} items)</h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <h3>Order Total: ${getBasketTotal(basket)}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
