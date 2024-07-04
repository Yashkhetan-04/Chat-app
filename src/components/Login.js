import React from 'react';
import { useState , useEffect} from 'react';
import Logo from '../assets/meetme.png'
import { Link } from 'react-router-dom';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (handleValidation()) {
          
            let user = await fetch("https://chat-app-backend-3lal.onrender.com/login", {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            user = await user.json();
            const flag = user.status;
            if(flag===false){
                toast.error(user.msg , toastOptions);
            }
            else if(flag === true){
                localStorage.setItem("user" , JSON.stringify(user.user));
                navigate(`/`);
            }
            // if(user){
            //     localStorage.setItem("user" , JSON.stringify(user));
            //     navigate('/');
            // }
            // else{
            //     alert(user.msg);
            // }
        }
    }

    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:'touch',
        theme:"dark",
    }

    const handleValidation = () => {

        if (password === "") {
            toast.error("Email and Password is required." , toastOptions);
            return false;
        }
        else if (email==="") {
            toast.error("Email and Password is required." , toastOptions);
            return false;
        }
        return true;
    };

    const handleChange_email = (event) => {
        setEmail(event.target.value);
    }
    
    const handleChange_password = (event) => {
        setPassword(event.target.value);
    }
    
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/');
        }
    },[])

    return (
        <>
        <div className='SignUp'>
            <div className='form'>
                <div className='brand'>
                    <img src={Logo} alt="Logo" />
                    <h1>Convoia</h1>
                </div>
                <input type="email" value={email} placeholder='Email' name='email' onChange={handleChange_email} />
    
                <input type="password" value={password} placeholder='Password' name='password' onChange={handleChange_password} />

                <button onClick={handleSubmit}>Login</button>
                <span>Don't have Account ? <Link to="/signup">SignUp</Link></span>

            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Login;