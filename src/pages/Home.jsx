import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='main'>
            <p>Welcome to Expense Tracker!!!</p>
            <div className='profile'>
                <p>Your Profile is Incomplete</p>
                <Link to='/updateProfile'>.CompleteNow</Link>
            </div>
        </div>
    )
}

export default Home
