import React from "react";
import "./styles/login.css";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/socketContext";
function PROFILE({ conversation }) {
    // console.log("Conversation Prop:", conversation); // Check if prop is pass
    const{selectedConversation,setSelectedConversation}= useConversation();
    const isSelected=selectedConversation ?._id ===conversation._id;
    const {onlineUsers}=useSocketContext();
    const isOnline=onlineUsers.includes(conversation._id);
    return (
        <div className={`profile ${isSelected ? "selected":""}`} onClick={()=>setSelectedConversation(conversation)}>
            {/* <div> */}
            <hr className="divider" />
            <div className={`avatar ${isOnline ? 'online': 'offline'}`}>
                <div className="avatar_img">
                    <img
                        src={conversation.profilePic}
                        alt="user avatar"
                    />
                </div>
                <div>
                    <p>{conversation.fullName}</p>
                </div>
                <div>
                    <time>22:00</time> {/* Replace with actual timestamp if needed */}
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

export default PROFILE;
