import React, { useState } from 'react';
import classes from './signUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const submitHandler = async (e) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY`;
        e.preventDefault();
        if (password !== confPassword) {
            alert('Password does not match');
        } else {
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
                    alert('Successfully signed up.');
                    setEmail('');
                    setPassword('');
                    setConfPassword('');
                } else {
                    const data = await res.json();
                    console.log(data.error.message);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.heading}>
                        <p>SignUp</p>
                    </div>
                    <div className={classes.formControl}>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={classes.formControl}>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <div className={classes.formControl}>
                        <input type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='Confirm Password' />
                    </div>
                    <div className={classes.actions}>
                        <button type='submit'>SignUp</button>
                    </div>
                </form>
                <div className={classes.last}>
                    Have an account? <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
