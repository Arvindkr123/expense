import React, { useState } from 'react'
import './signUp.css'
import { Link} from 'react-router-dom'
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfPassword, setConfPassword] = useState('');

    const submitHandler = async (e) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
        AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY`
        e.preventDefault();
        if (password !== ConfPassword) {
            alert('password does not match')
        } else {
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
                }
                const data = await res.json();
                setEmail('');
                setPassword('')
                setConfPassword('')
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <div className='wrapper'>
            <form className='form' onSubmit={submitHandler}>
                <div className='heading'>
                    <p>SignUp</p>
                </div>
                <div className='form-control'>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                </div>
                <div className='form-control'>
                    <input value={ConfPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" placeholder='Confirm Password' />
                </div>
                <div className='actions'>
                    <button type='submit'>SignUp</button>
                </div>
            </form>
            <div className='last'>
                Have an account ? <Link to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default SignUp
