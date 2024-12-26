import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
const SIGNUP=()=>{
    const [inputs,setInputs]=useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })
    const {loading,signup}=useSignup()
    const handleCheckboxChange=(gender)=>{
        setInputs({...inputs,gender})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signup(inputs)
        console.log(inputs);
    }
    return(
        <>
        <div className='centered-div'>
            <h1>Sign Up <span>ChatApp</span></h1>
            <div>
                <form  onSubmit={handleSubmit} >
                    <div className='form'>
                    <label htmlFor="" >Full Name</label><br />
                    <input type="text" placeholder="Enter Name" value={inputs.fullName} 
                    onChange={(e) => setInputs({...inputs,fullName: e.target.value})}/><br />
                    <label htmlFor="" >Username</label><br />
                    <input type="text" placeholder="Enter username" value={inputs.username}
                    onChange={(e)=>setInputs({...inputs,username: e.target.value})}/><br />
                    <label htmlFor="">Password:</label><br />
                    <input type="password" placeholder='Enter password' value={inputs.password}
                    onChange={(e)=>setInputs({...inputs,password: e.target.value})}/>
                    <label htmlFor="">Confirm Password:</label><br />
                    <input type="password" placeholder='Enter Confirm password' value={inputs.confirmPassword}
                    onChange={(e)=>setInputs({...inputs,confirmPassword: e.target.value})}/>
                    </div>
                    <GENDERCHECKBOX onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}  />
                    
                    
                    <div className='submit'>
                    <button disabled={loading}>{loading?<span className='loader'></span>:"Sign Up"}</button>
                    </div>
                </form>
            </div>
            
            
        </div>
        </>
    );
}
export default SIGNUP;
const GENDERCHECKBOX=({onCheckboxChange,selectedGender})=>{
    return(
        <>
        <div className='gender'>
                    <label htmlFor='' className={' ${selected}'} >Male:
                    <input type="radio" name="gender" checked={selectedGender === "male"}
                    onChange={()=>onCheckboxChange("male")}/>
                    {/* <span className="checkmark"></span> */}
                    </label>
                    <label htmlFor='' className="">Female:
                    
                    <input type="radio" name="gender" checked={selectedGender === "female"}
                    onChange={()=>onCheckboxChange("female")}/>
                    {/* <span className="checkmark"></span> */}
                    </label><br />
                    <Link to="/login"><p>' Already have an Account ? ' </p></Link>
        </div>
        </>
    )
}