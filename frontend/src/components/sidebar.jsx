import PROFILES from "./profiles";
import { IoSearchSharp } from "react-icons/io5";

import "./styles/App.css";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import useGetProfiles from "../hooks/useGetProfiles";
import toast from "react-hot-toast";
const SIDEBAR=({onSelectProfile})=>{

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
        <form className="search_bar flex justify-center items-center md:w-[110%] mb-4 mx-2 md:mx-0" onSubmit={handleSubmit} >
        <input className="w-[90%] h-[42px]" type="text" placeholder="search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button className="text-[24px] h-[42px] w-[15%] pl-3" type="submit" title="Search">
        {/* <LiaSearchengin /> */}
        <IoSearchSharp />
        </button>
        </form>
        </div>
        <div  className="scroll h-[90%] md:h-[95%]">
            <button onClick={onSelectProfile}>
                <PROFILES />
            </button>
        
        
        </div>
        
        </>
    );
}
export default SIDEBAR;