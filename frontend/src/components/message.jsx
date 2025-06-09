import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import "./styles/App.css";

export default function MESSAGE({message}){
    const {authUser} =useAuthContext();
    const {selectedConversation}=useConversation();
    const fromMe=message.senderId===authUser._id;
    const chatClassName=fromMe? 'chat-end':'chat-start';
    const profilePic =fromMe? authUser.profilePic:selectedConversation?.profilePic;
    const bubbleBgColor=fromMe?'bubbleBgSender':'bubbleBgReceiver';
    const message_time = new Date(message.createdAt).toLocaleString([], { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    return(
        <div className="chat-container">
            <div className={`${chatClassName}`}>
            <div className="inbox_img flex-shrink-0">
            <img
              src={profilePic}
              alt="user avatar"
            />
            <br />
            </div>
            <div>
            <div className="chat  text-ellipsis">
                {/* <div className="message"> */}
                <h3 
                className={`${bubbleBgColor}`}
                >{message.message}</h3>
                <h6>{`${message_time}`}</h6>
                
            </div>
            </div>
            </div>
        </div>
    );
}
