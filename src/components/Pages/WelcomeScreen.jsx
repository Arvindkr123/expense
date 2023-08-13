<<<<<<< HEAD
import React, { Fragment, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthContext from "../Authentication/auth-context";
import Store, { StoreData } from "../storeOfData/Store";
import { authAction } from "../storeRedux/authReducer";
import ExpenseItems from "./Expense/ExpenseItems";
import classes from "./WelcomeScreen.module.css";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const ctx = useContext(StoreData);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY";
  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("idToken"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Check your email inbox");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.left}>Welcome to expance tracker!!!!</div>
        <div className={classes.right}>
          Your profile is incomplete.
          <Link to="/completeprofile">Complete now</Link>
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.logout}
          onClick={() => dispatch(authAction.logout())}
        >
          logout
        </button>
        <button
          type="submit"
          onClick={verifyEmailHandler}
          className={classes.verifyEmail}
        >
          Verify Email
        </button>
      </div>
      <div className={classes.line}></div>
      <div className={classes.form}>
        <ExpenseItems />
      </div>
      <div className={classes.table}></div>
    </Fragment>
  );
};

export default WelcomeScreen;
=======
import React, { Fragment, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { authAction } from '../storeRedux/authReducer'
import ExpenseItems from './Expense/ExpenseItems'
import classes from './WelcomeScreen.module.css'

const WelcomeScreen = () => {
    const dispatch = useDispatch()
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY'
    const verifyEmailHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: localStorage.getItem('idToken')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Check your email inbox')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Fragment>
            <div className={classes.main}>
                <div className={classes.left}>
                    Welcome to Expence Tracker!!!!
                </div>
                <div className={classes.right}>
                    Your profile is incomplete.<Link to='/completeprofile'>Complete now</Link>
                </div>
            </div>
            <div className={classes.buttons}>
                <button className={classes.logout} onClick={() => dispatch(authAction.logout())}>logout</button>
                <button type='submit' onClick={verifyEmailHandler} className={classes.verifyEmail}>Verify Email</button>
            </div>
            <div className={classes.line}></div>
            <div className={classes.form}>
                <ExpenseItems />
            </div>
        </Fragment>
    )
}

export default WelcomeScreen
>>>>>>> e88594ff9437630a8f2ad597b67d80d1e1cb6de9
