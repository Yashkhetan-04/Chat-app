import React ,{useState , useEffect} from 'react'
import Robot from '../assets/robot.gif'
import './Welcome.css'

const Welcome = ({currentUser , isLoaded}) => {
    
    // console.log(currentUser.username);
    return(
        <div className='Welcome'>
            <img src={Robot} alt="robot" />
            <h1>Welcome, <span> {isLoaded && currentUser.username}</span></h1>

            <h3>Please select a chat to Start Messaging.</h3>
        </div>
    )
}

export default Welcome