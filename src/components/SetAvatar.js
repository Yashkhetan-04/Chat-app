import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import './SetAvatar.css'
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SetAvatar = () => {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }
    },[])

    
    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:'touch',
        theme:"dark",
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an Avater" , toastOptions);
        }
        else {
            const image = avatars[selectedAvatar];
            let result = JSON.parse(localStorage.getItem('user'));
            let userId = result._id;
            if ( userId !== undefined) {
                let data = await fetch(`https://chat-app-backend-3lal.onrender.com/setAvatar/${userId}`, {
                    method: 'post',
                    body: JSON.stringify({ image }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                data = await data.json();
                if (data.isSet) {
                    result.isAvatarImageSet = true; //saving changes in localhost
                    result.AvatarImage = data.image;
                    localStorage.setItem('user', JSON.stringify(result));
                    navigate('/');
                }
                else {
                    toast.error("Error setting Avatar!Please try again later" , toastOptions);
                }
            }
            else {
                toast.error("ID is not accessible" , toastOptions);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    }

    return (
        <>
            {
                isLoading ?
                    <div className="setAvatar">
                        <img src={loader} alt="loader" />
                    </div>
                    :
                    <div className="setAvatar">

                        <div className="title-container">
                            <h1>Pick an Avatar as your profile picture</h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`avatar ${selectedAvatar === index ? "selected" : ""
                                            }`}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            key={avatar}
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={setProfilePicture} className="submit-btn">
                            Set as Profile Picture
                        </button>
                    </div>
            }
            <ToastContainer/>
        </>
    );
}

export default SetAvatar



