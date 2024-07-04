import React from 'react'
import { useState, useEffect , useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Chat.css'
import Contacts from './Contacts.js'
import Welcome from './Welcome.js'
import {io} from 'socket.io-client'
// import ErrorBoundary from './ErrorBoundary.js'
import ChatContainer from './ChatContainer.js'
const Chat = () => {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoadedchat , setisLoadedchat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
    else {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
      setisLoaded(true);
    }
  }, [])

  useEffect(()=>{
    if(currentUser){
      // socket.current = io("http://localhost:7000");
      socket.current = io("https://chat-app-backend-3lal.onrender.com");
      socket.current.emit("add-user" ,currentUser._id);
    }
  },[currentUser])


  useEffect(() => {
    if (isLoaded === true) getContacts();
  }, [currentUser])   // [currentUser] means this useEffect will only work when currentUser is defined

  const getContacts = async () => {

    if (isLoaded === true) {

      if (currentUser.isAvatarImageSet === true) {
        let userId = currentUser._id;
        // let result = await fetch(`http://localhost:7000/allusers/${userId}`);
        let result = await fetch(`https://chat-app-backend-3lal.onrender.com/allusers/${userId}`);
        result = await result.json();

        setContacts(result);
      }
      else {
        navigate('/setAvatar')
      }
    }
  }

  const handleChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <div className='Chat'>
      <div className="container">

        {isLoaded && <Contacts contacts={contacts} currentUser={currentUser} currentChat={handleChange} />
        }
        {currentChat === undefined ? <Welcome currentUser={currentUser} isLoaded={isLoaded} /> :
          <ChatContainer currentChat={currentChat} currentUser={currentUser} isLoaded={isLoaded} socket={socket} />
        }
      </div>
    </div>
  )
}

export default Chat
