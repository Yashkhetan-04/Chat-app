import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import './SetAvatar.css'
import loader from '../assets/loader.gif';
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

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            alert("Please select an Avatar.")
        }
        else {
            const image = avatars[selectedAvatar];
            // console.log(selectedAvatar);
            let result = JSON.parse(localStorage.getItem('user')).user;
    
            let userId = result._id;
            // console.log(userId);
            if ( userId !== undefined) {
                let data = await fetch(`http://localhost:7000/setAvatar/${userId}`, {
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
                    // result = JSON.parse(result);
                    localStorage.setItem('user', JSON.stringify(result));
                    navigate('/');
                }
                else {
                    alert("Error setting Avatar! try again later");
                }
                // console.log(data);
            }
            else {
                alert("ID is not accessible");
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

        </>
    );
}

export default SetAvatar



