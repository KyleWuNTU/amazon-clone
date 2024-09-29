import React, { useEffect, useState } from "react";
import './styles/App.css';
import Header from "./pages/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Footer from "./pages/Footer";
import { useStateValue } from "./pages/StateProvider";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe( "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL")
                          //"pk_test_51MxNoHFDiGp5yo0l5vw7toWcsxTNof5Efw48mPrzAK26idshaX5A7QpgOD2l391rPopwALFmWq3QvPFghewoDfy900LlMOmkt2");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const checkUserStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode the JWT token
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userEmail = decodedToken.sub; // 'sub' claim typically contains the user identifier (email in this case)

          dispatch({
            type: 'SET_USER',
            user: { email: userEmail }
          });
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token'); // Remove invalid token
          dispatch({
            type: 'SET_USER',
            user: null
          });
        }
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    };

    checkUserStatus();

    // Add event listener for storage changes
    window.addEventListener('storage', checkUserStatus);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', checkUserStatus);
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/orders" element={<React.Fragment> 
            <Header />
            <Orders />
          </React.Fragment>} />
          <Route path="/login" element={<React.Fragment> 
            <Login />
          </React.Fragment>} />
          <Route path="/checkout" element={<React.Fragment> 
            <Header />
            <Checkout />
          </React.Fragment>} />
          <Route path="/payment" element={<React.Fragment> 
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </React.Fragment>} />
          <Route path="/" element={<React.Fragment> 
            <Header />
            <Home />
            <Footer />
          </React.Fragment>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
