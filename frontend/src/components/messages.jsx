import React from 'react'
import MESSAGE from './message'
import useGetMessages from '../hooks/useGetMessages';
import { useEffect } from 'react';
import { useRef } from 'react';
import useListenMessages from '../hooks/useListenMessages';

const MESSAGES=()=> {
  const {loading,messages} = useGetMessages();
  // console.log("MESSAGES:",messages);
  useListenMessages();

  const lastMessageRef=useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
    },100);
  },[messages]);
  return (
    <div >
      {/* {loading?<span className='loader'></span>:null} */}
      {!loading && messages.length===0 && (<p className='No_messages'>Send a message to start conversation...</p>)}
      {!loading && messages.length > 0 && messages.map((message)=>(
        <div key={message._id} ref={lastMessageRef}>
          <MESSAGE  message={message}/>
        </div>
      ))}
    </div>
  )
}

export default MESSAGES;
