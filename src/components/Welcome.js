// import React ,{useState , useEffect} from 'react'
import Robot from '../assets/robot.gif'
import './Welcome.css'
import Logout from './Logout.js'


const Welcome = ({currentUser , isLoaded}) => {
    
  
    return(
        <div className='Welcome'>
            <div className='LogoutPosition'><Logout /></div>
            <div className='OtherPosition'>
                <img src={Robot} alt="robot" />
                <h1>Welcome, <span> {isLoaded && currentUser.username}</span></h1>

                <h3>Please select a chat to Start Messaging.</h3>
            </div>
        </div>
    )
}

export default Welcome