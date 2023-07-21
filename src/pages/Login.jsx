import React, { useState , useContext} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const ctx = useContext(AuthContext);

    const submitHandler = async (e) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
        AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY`
        e.preventDefault();
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                alert('Successfully signed up.');
                setIsLoggedIn(true);
                alert("Your profile is incomplete!!!")
                navigate("/")
            }
            const data = await res.json();
            setEmail('');
            setPassword('')
        } catch (err) {
            console.log(err.message)
            setIsLoggedIn(false);
        }
    }

    return (
        <div className='wrapper'>
            <form className='form' onSubmit={submitHandler}>
                <div className='heading'>
                    <p>Login</p>
                </div>
                <div className='form-control' onSubmit={submitHandler}>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                </div>
                <div className='actions'>
                    <button type='submit' onClick={()=>ctx.login()}>Login</button>
                </div>
            </form>
            <div className='last'>
                don't have an account ? <Link to='/signUp'>SignUp</Link>
            </div>
        </div>
    )
}

export default Login
