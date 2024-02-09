import React from 'react'
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from 'react-icons/bi'
import './Logout.css'
const Logout = () => {
    const navigate = useNavigate();

    const HandleOnClick = () => {
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div className='Logout'>
            <button onClick={HandleOnClick} className='Logout-btn'><BiPowerOff/></button>
        </div>
    );
}

export default Logout