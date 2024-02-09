import React ,{useState} from 'react'
import './ChatInput.css'
import Picker from 'emoji-picker-react'

import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker , setshowEmojiPicker] = useState(false);
    const [msg , setMsg] = useState("");

    const HandleShowEmojiPicker = () => {
        setshowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event , emoji) => {
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }

    return (
        <div className='ChatInput'>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={HandleShowEmojiPicker}/>
                    {showEmojiPicker && <span className='emoji-picker-react'><Picker onEmojiClick={handleEmojiClick}/></span>}
                    
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder='Type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className='submit'> 
                    <IoMdSend/>
                </button>
            </form>
        </div>
    )
}

export default ChatInput