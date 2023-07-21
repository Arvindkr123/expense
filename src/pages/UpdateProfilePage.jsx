import React, { useState } from 'react'
import './updateProfile.css'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const UpdateProfilePage = () => {
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState()
    const urlGet = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAX8qM-jX3aBtw6RklLgkhDt1662bXXBlY';
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(name, imgUrl)
    }
    return (
        <div>
            <div className='main'>
                <p>Winners never quite, Quitters never win.</p>
                <div className='profile'>
                    <p>Your Profile is 64% completed.A complete profile has <br />  higher chance of landing a job
                        <Link>.CompleteNow</Link></p>
                </div>
            </div>

            <form className='form' onSubmit={submitHandler}>
                <div className='update-header'>
                    <h3>Contact Details</h3>
                    <button>Cancel</button>
                </div>
                <div className='input-wrapper'>
                    <div className='formInput'>
                        <label><FaGithub size={'25px'} />  FullName:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='formInput'>
                        <label><CgProfile size={'25px'} />  Profile Photo:   </label>
                        <input type="file" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    </div>
                </div>
                <button className='sbmt' type='submit'>Update</button>
                <div className='line'></div>
            </form>
        </div>
    )
}

export default UpdateProfilePage
