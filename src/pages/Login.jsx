import React, { useState, useContext } from 'react';
import classes from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const ctx = useContext(AuthContext);

    const submitHandler = async (e) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY`;
        e.preventDefault();
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                alert('Successfully logged in.');
                setIsLoggedIn(true);
                alert('Your profile is incomplete!!!');
                navigate('/');
            }

            const data = await res.json();
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log(err.message);
            setIsLoggedIn(false);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.heading}>
                        <p>Login</p>
                    </div>
                    <div className={classes.formcontrol}>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={classes.formcontrol}>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <div className={classes.actions}>
                        <button type='submit' onClick={() => ctx.login()}>
                            Login
                        </button>
                    </div>
                </form>
                <div className={classes.last}>
                    Don't have an account? <Link to='/signUp'>SignUp</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
