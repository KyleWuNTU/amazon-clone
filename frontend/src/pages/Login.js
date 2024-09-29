import React, {useState} from 'react'
import '../styles/Login.css'
import { Link , useNavigate } from 'react-router-dom'
import axios from './axios'
import { useStateValue } from './StateProvider'

function Login() {
    const navigate = useNavigate ();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [, dispatch] = useStateValue();  // Add this line to get dispatch

    const signIn = async (e) => {
        e.preventDefault();  // Prevent default form submission
        try {
            const response = await axios.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch({
                    type: 'SET_USER',
                    user: {email: email}
                });
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Invalid email or password. Please try again.");
                } else {
                    alert(error.response.data || 'An error occurred during login');
                }
            } else {
                alert('An error occurred during login. Please try again later.');
            }
            console.error('Login error:', error);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("This email is already registered. Please use a different email.");
            } else {
                alert(error.response?.data?.message || 'An error occurred during registration');
            }
        }
    }

  return (
    <div className='login'>
        <Link to="/">
        <img className='login__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png'
            alt="login-logo">
        </img>
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>
            <form onSubmit={signIn}>  {/* Add onSubmit here */}
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                
                <h5>Password</h5>
                <input type='password' value={password} onChange={e =>setPassword(e.target.value)} ></input>
                
                <button type='submit' className='login__signInButton'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to AMAZON FAKS CLONE's Conditions of Use & Sales.
                Please see our Privacy Notice, our Cookies Notice and out Interest-Based Ads Notice.
            </p>
            <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
        </div>    
    </div> 
  )
}

export default Login
