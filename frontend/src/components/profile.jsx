import React from "react";
import "./styles/login.css";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/socketContext";

function PROFILE({ conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  let lastOnline = "Offline";

  // Debugging: Check the value of conversation.lastOnline
  // console.log("conversation.lastOnline:", conversation?.lastOnline);

  if (conversation?.lastOnline) {
    const date = new Date(conversation.lastOnline);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      lastOnline = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      console.error("Invalid timestamp:", conversation.lastOnline);
    }
  }

  return (
    <div
      className={`profile cursor-pointer h-[56px] md:h-[64px] ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <hr className="divider w-full" />
      <div className={`flex items-center w-full h-full px-3 ${isOnline ? "online" : "offline"}`}>
  {/* Avatar */}
  <div className="w-[42px] h-[42px] md:h[48px] md:w-[48px] flex-shrink-0 flex items-center justify-center">
    <img src={conversation.profilePic} alt="user avatar" className="w-[42px] h-[42px] object-cover rounded-full" />
  </div>

  {/* Full Name */}
  <div className="flex-grow mx-2 overflow-hidden">
    <p className="text-white text-[24px] md:text-[18px] text-left whitespace-nowrap overflow-hidden text-ellipsis">{conversation.fullName}</p>
  </div>

  {/* Last Online */}
  <div className="flex-shrink-0 flex flex-col items-end text-sm text-white">
    <h6>{isOnline ? "online" : "offline"}</h6>
  </div>
</div>

    </div>
  );
}

export default PROFILE;
