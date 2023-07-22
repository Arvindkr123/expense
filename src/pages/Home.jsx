import React, { useContext, useState } from 'react';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import ExpenseItems from '../components/Expense/ExpenseItems.jsx';
import ExpenseTable from '../components/Expense/ExpenseTable.jsx';
import { StoreData } from '../StoreOfData/store';

const Home = () => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY';
    const ctx = useContext(AuthContext);
    const [showExp, setShowExp] = useState(false);
    const dataCtx = useContext(StoreData);

    const verifyEmailHandler = async (e) => {
        e.preventDefault();
        const idToken = localStorage.getItem('idToken');
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: idToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                // Handle non-200 response status (error)
                const errorData = await res.json();
                throw new Error(`Email verification request failed: ${errorData.error.message}`);
            }

            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log('Error:', err.message);
        }
    };



    return (
        <>
            <div className={classes.main}>
                <div className={classes.left}>Welcome to expense tracker!!!!</div>
                <div className={classes.right}>
                    Your profile is incomplete.
                    <Link to="/updateProfile">Complete now</Link>
                </div>
            </div>
            <button type="submit" onClick={verifyEmailHandler} className={classes.verifyEmail}>
                Verify Email
            </button>
            <button className={classes.logout} onClick={() => ctx.logout()}>
                Logout
            </button>
            <div className={classes.line}></div>
            <div className={classes.form}>
                <div className={classes.addExp}>
                    <button type='button' className='btn btn-secondary' onClick={() => setShowExp(!showExp)}>{!showExp ? '+Add Expense' : 'Close'}</button>
                </div>
            </div>
            {showExp && <div className={classes.form}>
                <ExpenseItems />
            </div>}
            <div className={classes.table}>
                <ExpenseTable />
            </div>

        </>
    );
};

export default Home;
