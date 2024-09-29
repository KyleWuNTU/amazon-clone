import React, { useState, useEffect } from 'react';
import '../styles/Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import axios from './axios';

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/orders/${user.email}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      } else {
        setOrders([]);
      }
    };
  
    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders;