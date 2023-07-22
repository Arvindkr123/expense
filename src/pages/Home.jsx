import React, { useContext } from 'react'
import classes from './home.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'

const Home = () => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY'
    const ctx = useContext(AuthContext);
    const verifyEmailHandler = (e) => {
        e.preventDefault();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('idToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const data = res.json();
            data.then((resp) => {
                console.log(resp);
            })
        }).catch((err) => {
            console.log('err', err)
        })
    }

    return (
        <>
            <div className={classes.main}>
                <div className={classes.left}>
                    Welcome to expance tracker!!!!
                </div>
                <div className={classes.right}>
                    Your profile is incomplete.<Link to='/updateProfile'>Complete now</Link>
                </div>
            </div>
            <button type='submit' onClick={verifyEmailHandler} className={classes.verifyEmail}>Verify Email</button>
            <button className={classes.logout} onClick={() => ctx.logout()}>logout</button>
        </>
    )
}

export default Home
