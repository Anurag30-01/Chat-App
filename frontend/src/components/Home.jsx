import React from 'react'
import SIDEBAR from './sidebar';
import CHATBOX from './ChatBox';
function HOME() {
  return (
    <>
      <div className='centered-div'>
            <h1><span>ChatApp</span></h1>
            <div className='home'>
            <div className='prof_div'><SIDEBAR/></div>
            <hr className='wall'/>
            <div className='chat_div'><CHATBOX/></div>
            </div>
            
        </div>
    </>
  )
}
export default HOME;
