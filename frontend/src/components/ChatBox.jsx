import { FiSend } from "react-icons/fi";
import { IoMdChatboxes } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import MESSAGES from "./messages";
import useGetMessages from "../hooks/useGetMessages";
import { useAuthContext } from "../context/AuthContext";
export default function CHATBOX(){
    // const NoMsgSelected = true;
    const{selectedConversation,setSelectedConversation}=useConversation();

    // const {loading,messages} = useGetMessages();
    //         console.log("MESSAGES:",messages);

    useEffect(()=>{
      return()=>setSelectedConversation(null)
    },[setSelectedConversation])

    return(
        <>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <ChatSelected />
            )}
 </>
    );
};
const NoChatSelected = () => {
  const {authUser}= useAuthContext();
  return (
      <>
          <div className="initial_msg">
              <h2>&#128075; welcome <span>{authUser.fullName}</span></h2>
              <h3>select a chat to start messaging &#128640;</h3>
              <IoMdChatboxes className="icon" />
          </div>
      </>
  );
}
const ChatSelected =()=>{
  const{selectedConversation,setSelectedConversation}=useConversation();
  return(
    
      <>
        <div className="chatbox_header">
          <h2>
            <span>To: </span>
          </h2>
          <div className="header_img">
            <img
              src={selectedConversation.profilePic}
              alt="user avatar"
            />
          </div>
          <h2>
            <span>{selectedConversation.fullName}</span>
          </h2>
        </div>
        <div className="scroll">
          <MESSAGES />
        </div>
        <div className="message_input">
          <MESSAGE_INPUT />
        </div>
      </>
  );
}
const MESSAGE_INPUT=()=>{
  const [message,setMessage]=useState("");
  const {loading,sendMessage}=useSendMessage();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return(
      <>
          <form className="message_input" action="" onSubmit={handleSubmit}>
              <input type="text" placeholder="Send Messages..." value={message}
              onChange={(e)=>setMessage(e.target.value)} />
              <button type="submit">
                  {loading?<span className="loader"></span>:<FiSend />}
              </button>
          </form>
      </>
  );
}
