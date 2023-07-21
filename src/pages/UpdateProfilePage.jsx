import React from 'react'
import './updateProfile.css'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const UpdateProfilePage = () => {
    return (
        <div>
            <div className='main'>
                <p>Winners never quite, Quitters never win.</p>
                <div className='profile'>
                    <p>Your Profile is 64% completed.A complete profile has <br />  higher chance of landing a job
                        <Link>.CompleteNow</Link></p>
                </div>
            </div>

            <form className='form'>
                <div className='update-header'>
                    <h3>Contact Details</h3>
                    <button>Cancel</button>
                </div>
                <div className='input-wrapper'>
                    <div className='formInput'>
                        <label><FaGithub size={'25px'} />  FullName:</label>
                        <input type="text" />
                    </div>
                    <div className='formInput'>
                        <label><CgProfile size={'25px'} />  Profile Photo:   </label>
                        <input type="text" />
                    </div>
                </div>
                <button className='sbmt' type='submit'>Update</button>
                <div className='line'></div>
            </form>
        </div>
    )
}

export default UpdateProfilePage
