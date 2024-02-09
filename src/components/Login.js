import React from 'react';
import { useState , useEffect} from 'react';
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (handleValidation()) {
            let user = await fetch("http://127.0.0.1:7000/login", {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            user = await user.json();
            // const flag = user.status;
            // console.log(flag);
            // if(flag===false){
            //     alert(user.msg);
            // }
            // else if(flag===true){
            //     localStorage.setItem("user" , JSON.stringify(user));
            //     navigate('/');
            // }
            if(user){
                localStorage.setItem("user" , JSON.stringify(user));
                navigate('/');
            }
            else{
                alert(user.msg);
            }
        }
        else{
            alert("123");
        }
    }

    const handleValidation = () => {

        if (password === "") {
            alert("Password is required");
            return false;
        }
        else if (email==="") {
            alert('Password should be greater than 8 character');
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
        <div className='SignUp'>
            <div className='form'>
                <div className='brand'>
                    <img src={Logo} alt="Logo" />
                    <h1>Snappy</h1>
                </div>
                <input type="email" value={email} placeholder='Email' name='email' onChange={handleChange_email} />
    
                <input type="password" value={password} placeholder='Password' name='password' onChange={handleChange_password} />

                <button onClick={handleSubmit}>Login</button>
                <span>Don't have Account ? <Link to="/signup">SignUp</Link></span>

            </div>
        </div>
    )
}

export default Login