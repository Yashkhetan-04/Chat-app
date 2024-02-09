import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg';
import './Contacts.css'

const Contacts = ({ contacts, currentUser , currentChat}) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
   
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.AvatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser])

    const changeCurrentChat = (index , contact) => {
        setCurrentSelected(index);
        currentChat(contact);
    }

    return (
        <>
            {currentUserImage && currentUserName && contacts && (
                <div className='Contacts'>
                    <div className="Contacts-brand">
                        <img src={Logo} alt="logo" />
                        <h3>Snappy</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div onClick={()=>changeCurrentChat(index , contact)} key={index} className={`contact ${index === currentSelected ? "selected" : ""}`}>
                                    <div className="Contact-avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.AvatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar1">
                            <img src={`data:image/svg+xml;base64,${currentUser.AvatarImage}`} alt="avatar" />
                        </div>
                        <div className="username1">
                            <h3>{currentUser.username}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts