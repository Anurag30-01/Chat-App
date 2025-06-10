import { FiSend } from "react-icons/fi";
import { IoMdChatboxes } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import MESSAGES from "./messages";
import useGetMessages from "../hooks/useGetMessages";
import { useAuthContext } from "../context/AuthContext";
export default function CHATBOX({onBack}) {
  // const NoMsgSelected = true;

  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      {!selectedConversation ? (
        <div className="flex justify-center items-center h-full">
          <NoChatSelected handleBack={onBack} />
        </div>
      ) : (
        <ChatSelected handleBack={onBack}/>
      )}
    </>
  );
}
const NoChatSelected = ({handleBack}) => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="initial_msg">
        <div>
          <h2 className="text-white text-[64px] mb-2">
            &#128075; Welcome <span>{authUser.fullName}</span>
          </h2>
          <h3 className="text-white text-[32px] mb-4">Select a chat to start messaging &#128640;</h3>
          <IoMdChatboxes className="text-white text-[96px] flex justify-self-center" />
          <button className="md:hidden text-white font-600 text-[18px]" onClick={handleBack}>← Back</button>
        </div>
      </div>
    </>
  );
};
const ChatSelected =({handleBack})=>{
  const{selectedConversation,setSelectedConversation}=useConversation();
  return(
    
      <>
        <div className="chatbox_header flex items-center w-full">
          <div className="">
  <button onClick={handleBack} className=" md:hidden text-white pl-1 text-[24px] md:text-[18px] font-semibold" title="Back to Chats">
    ←
  </button>
  
</div>
          <h2 className="text-white text-[24px] md:text-[32px] ">
            To:
          </h2>
          <div className="header_img w-[42px]  mt-1">
            <img className="w-[42px] h-[42px]  rounded-full object-cover"
              src={selectedConversation.profilePic}
              alt="user avatar"
            />
          </div>
          <h2 className="text-white text-[24px] md:text-[32px] text-ellipsis overflow-hidden whitespace-nowrap">
            {selectedConversation.fullName}
          </h2>
          {/** Only show on small screens */}
          

        </div>
        <div className="scroll h-[85%] md:h-[85%] bg-slate-900/30">
          <MESSAGES />
        </div>
        

        <div className="w-full text-xl">
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
          <form className="message_input flex justify-center " action="" onSubmit={handleSubmit}>
              <input className="md:h-[48px] w-[80%] md:w-full mr-1 md:mr-2 p-4" type="text" placeholder="Send Messages..." value={message}
              onChange={(e)=>setMessage(e.target.value)} />
              <button className="text-[32px] md:h-[48px] w-[48px] flex justify-center items-center" type="submit">
                  {loading?<span className="loader"></span>:<FiSend />}
              </button>
          </form>
      </>
  );
}
