import React, { useState } from 'react'
import './styles/login.css'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin';
export default function LOGIN(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const {loading,login}=useLogin();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(username,password)
    }
    return(
        <>
        <div className='login_div'>
            <h1>Login <span>ChatApp</span></h1>
            <form onSubmit={handleSubmit}>
            <div className='form'>
                <label>username: </label><br />
                <input type="text" placeholder="Enter username" value={username}
                onChange={(e)=> setUsername(e.target.value)}/><br />
                <label >Password:</label><br />
                <input type="password" placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}/><br />
                {/* <a href="">'Forget Password'</a><br /><br /> */}
            <Link to="/signup"><p>'Don't have an account!'</p></Link>
            </div>
            <br />
            <div className='submit'>
            <div><button disabled={loading}>{loading?<span className='loader'></span>:"Login"}</button></div>
            </div>
            </form>
        </div>
        </>
    )
}