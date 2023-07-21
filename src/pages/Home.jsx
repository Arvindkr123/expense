import React from 'react'
import classes from './home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className={classes.main}>
            <p>Welcome to Expense Tracker!!!</p>
            <div className={classes.profile}>
                <p>Your Profile is Incomplete</p>
                <Link to='/updateProfile'>.CompleteNow</Link>
            </div>
        </div>
    )
}

export default Home
