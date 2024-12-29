import PROFILES from "./profiles";
import { Link } from "react-router-dom";
// import { LiaSearchengin } from "react-icons/lia";
import { IoSearchSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import "./styles/login.css";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import useGetProfiles from "../hooks/useGetProfiles";
import toast from "react-hot-toast";
const SIDEBAR=()=>{

    const [search,setSearch]=useState("");
    const {setSelectedConversation}=useConversation();
    const{conversations}=useGetProfiles();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!search)return;
        const conversation=conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversation){
            setSelectedConversation(conversation);
            setSearch("");
        }
        else{
            toast.error("User Not Found...")
        }
    }
    const {loading,logout}=useLogout();
    return(
        <>
        <div>
        <form className="search_bar" onSubmit={handleSubmit} >
        <input type="text" placeholder="search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button type="submit">
        {/* <LiaSearchengin /> */}
        <IoSearchSharp />
        </button>
        </form>
        </div>
        <div className="scroll">
        <PROFILES />
        
        </div>
        <div className='logout_btn'>
            {!loading ? (<Link to="/login"><button><CiLogout onClick={logout} /></button></Link>):(<span className="loader"></span>)}
            {/* <Link to="/login"><button><CiLogout onClick={logout} /></button></Link> */}
        </div>
        </>
    );
}
export default SIDEBAR;