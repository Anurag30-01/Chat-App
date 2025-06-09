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
        <div className='signUp_div'>
            <p className='text-white text-[32px] mt-2'>Sign Up <span>ChatApp</span></p>
            <div>
                <form onSubmit={handleSubmit} >
                    <div className='form' name='signUp_form'>
                    <label htmlFor='fullName'>Full Name</label><br />
                    <input type="text" id='fullName' placeholder="Enter Name" value={inputs.fullName} 
                    onChange={(e) => setInputs({...inputs,fullName: e.target.value})}/><br />
                    <label htmlFor='userName' >Username</label><br />
                    <input type="text" id='userName' placeholder="Enter username" value={inputs.username}
                    onChange={(e)=>setInputs({...inputs,username: e.target.value})}/><br />
                    <label htmlFor='password'>Password:</label><br />
                    <input type="password" id='password' placeholder='Enter password' value={inputs.password}
                    onChange={(e)=>setInputs({...inputs,password: e.target.value})}/>
                    <label htmlFor='confirmPassword'>Confirm Password:</label><br />
                    <input type="password" id='confirmPassword' placeholder='Enter Confirm password' value={inputs.confirmPassword}
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
                    <label htmlFor='male' className={' ${selected}'} >Male:
                    <input type="radio" name="gender" id='male' checked={selectedGender === "male"}
                    onChange={()=>onCheckboxChange("male")}/>
                    {/* <span className="checkmark"></span> */}
                    </label>
                    <label htmlFor='female' className="">Female:
                    
                    <input type="radio" name="gender" id='female' checked={selectedGender === "female"}
                    onChange={()=>onCheckboxChange("female")}/>
                    {/* <span className="checkmark"></span> */}
                    </label><br /><br />
                    <Link to="/login"><p>' Already have an Account ? ' </p></Link>
        </div>
        </>
    )
}