import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import "./styles/login.css";

export default function MESSAGE({message}){
    const {authUser} =useAuthContext();
    const {selectedConversation}=useConversation();
    const fromMe=message.senderId===authUser._id;
    const chatClassName=fromMe? 'chat-end':'chat-start';
    const profilePic =fromMe? authUser.profilePic:selectedConversation?.profilePic;
    const bubbleBgColor=fromMe?'bubbleBgSender':'bubbleBgReceiver';
    return(
        <div className="chat-container">
            <div className={`${chatClassName}`}>
            <div className="inbox_img">
            <img
              src={profilePic}
              alt="user avatar"
            />
            <br />
            </div>
            <div>
            <div className="chat">
                {/* <div className="message"> */}
                <h3 
                className={`${bubbleBgColor}`}
                >{message.message}</h3>
                {/* </div> */}
                <h6>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h6>
                {/* <h6>{new Date(message.createdAt).toDateString()}</h6> */}
                
            </div>
            </div>
            </div>
        </div>
    );
}
