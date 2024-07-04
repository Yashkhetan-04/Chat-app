import React from 'react';
import { useState  , useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/meetme.png'
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (handleValidation()) {
            let result = await fetch("https://chat-app-backend-3lal.onrender.com/register", {
                method: 'post',
                body: JSON.stringify({ username, email, password}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            result = await result.json();
           const flag = result.status;
            if(flag===false){
                toast.error(result.msg , toastOptions);
            }
            else if(flag===true){
                localStorage.setItem("user" , JSON.stringify(result.user));
                navigate(`/setAvatar`);
            }
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

        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same." , toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error("Username should be greater than 3 character." , toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should be greater than 8 character." , toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email is required." , toastOptions);
            return false;
        }
        return true;
    };

    const handleChange_name = (event) => {
        setUsername(event.target.value);
    }
    const handleChange_email = (event) => {
        setEmail(event.target.value);
    }
    const handleChange_password = (event) => {
        setPassword(event.target.value);
    }
    const handleChange_confrimPassword = (event) => {
        setConfirmPassword(event.target.value);
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
                <input type="text" value={username} placeholder='UserName' name='username' onChange={handleChange_name} />
                <input type="email" value={email} placeholder='Email' name='email' onChange={handleChange_email} />
                <input type="password" value={password} placeholder='Password' name='password' onChange={handleChange_password} />
                <input type="password" value={confirmPassword} placeholder='Confirm Password' name='confirm password' onChange={handleChange_confrimPassword} />
                <button onClick={handleSubmit} >Create User</button>
                <span>Already have an Account ? <Link to="/login">Login</Link></span>
            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Register