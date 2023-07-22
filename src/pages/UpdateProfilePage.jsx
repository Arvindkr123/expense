import React, { useEffect, useState } from 'react';
import classes from './updateProfile.module.css';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const UpdateProfilePage = () => {
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();

    const urlGet = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY';

    // first get the data from firebase
    const getDataHandler = () => {
        fetch(urlGet, {
            method: "POST",
            body: JSON.stringify({
                idToken: localStorage.getItem('idToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const data = res.json();
            data.then((resp) => {
                console.log(resp.users);
                setName(resp.users[0].displayName)
                setImgUrl(resp.users[0].photoUrl)
            })
        })
    }

    useEffect(() => {
        getDataHandler();
    }, [])

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY'

    const submitHandler = (e) => {
        e.preventDefault();

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage.getItem('idToken'),
                displayName: name,
                photoUrl: imgUrl,
                // deleteAttribute: "NULL",
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            const data = res.json();
            data.then((resp) => {
                if (resp.error) {
                    alert(resp.error.message)
                } else {
                    console.log('resp', resp);
                }
            })
        }).catch((err) => {
            alert(err);
        })
        console.log(name);
        console.log(imgUrl);
        setName('')
        setImgUrl('')
    }



    return (
        <div>
            <div className={classes.main}>
                <p>Winners never quit, Quitters never win.</p>
                <div className={classes.profile}>
                    <p>
                        Your Profile is 64% completed. A complete profile has <br /> higher chance of landing a job
                        <Link>.CompleteNow</Link>
                    </p>
                </div>
            </div>

            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes['update-header']}>
                    <h3>Contact Details</h3>
                    <button>Cancel</button>
                </div>
                <div className={classes['input-wrapper']}>
                    <div className={classes.formInput}>
                        <label>
                            <FaGithub size={'25px'} /> FullName:
                        </label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={classes.formInput}>
                        <label>
                            <CgProfile size={'25px'} /> Profile Photo URL:{' '}
                        </label>
                        <input type='text' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                </div>
                <button className={classes.sbmt} type='submit'>
                    Update
                </button>
                <div className={classes.line}></div>
            </form>
        </div>
    );
};

export default UpdateProfilePage;
