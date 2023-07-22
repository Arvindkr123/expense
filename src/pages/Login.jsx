import React, { useState, useContext } from 'react';
import classes from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
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
            console.log(res)

            if (res.ok) {
                alert('Successfully logged in.');
                alert('Your profile is incomplete!!!');
                navigate('/');
            }

            const data = await res.json();
            console.log(data.idToken)
            localStorage.setItem('idToken', data.idToken);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log(err.message);
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
                        <p><Link to='/forgotPassword'>forgot password</Link></p>
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
