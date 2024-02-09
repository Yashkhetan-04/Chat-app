import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './ChatContainer.css'
import Logout from './Logout.js'
import ChatInput from './ChatInput.js'
import Messages from './Messages.js'
import {v4 as uuidv4} from 'uuid'
const ChatContainer = ({ currentChat, currentUser, isLoaded , socket}) => {
    const [messages, setMessages] = useState([]);
    const [isdataloaded , setisdataloaded] = useState(false);

    const [arrivalMessage , setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    useEffect(() => {
        if(currentChat) fetchchat();
    }, [currentChat])

    const fetchchat = async () => {
        let from = currentUser._id;
        let to = currentChat._id;
        
        let response = await fetch("http://127.0.0.1:7000/getmsg", {
            method: 'post',
            body: JSON.stringify({from, to}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        response = await response.json();
        console.log(response);
        setMessages(response);
        setisdataloaded(true);
    }


    const handleSendMsg = async (msg) => {
        if (isLoaded === true) {
            console.log(currentChat._id, currentUser._id, msg);
            let from = currentUser._id;
            let to = currentChat._id;
            let message = msg;
            await fetch("http://127.0.0.1:7000/addmsg", {
                method: 'post',
                body: JSON.stringify({ from, to, message }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            socket.current.emit("send-msg" ,{
                to:currentChat._id,
                from:currentUser._id,
                message:msg,
            })

            const msgs = [...messages];
            msgs.push({fromSelf:true,message:msg});
            setMessages(msgs);
        }
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg});
            });
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev , arrivalMessage]);
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour : "smooth"})
    },[messages])

    return (
        <div className='ChatContainer'>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar2">
                        <img src={`data:image/svg+xml;base64,${currentChat.AvatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            {/* <Messages /> */}
            <div className="chat-messages">
                {
                    isLoaded && isdataloaded && messages.map((message,index) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "senders" : "received"}`}>
                                    <div className="content1 content2 content3">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer