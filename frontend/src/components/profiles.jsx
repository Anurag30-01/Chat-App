import React from 'react'
import PROFILE from "./profile";
// import Conversation from "./Conversation";
import useGetProfiles from '../hooks/useGetProfiles';
const PROFILES=()=> {
    const{loading,conversations}=useGetProfiles();
    // console.log("Conversations:",conversations)

  return (
    <div>
        {/* <div className=""> */}
        {conversations.map((conversation)=>{
            return(
                <PROFILE
            key= {conversation._id}
            conversation={conversation}
            />
            )
        })}
        {loading?<span className='loader'></span>:null}
        </div>
    // </div>
  )
}
export default PROFILES;
