import React, { useEffect, useState } from 'react'
import styles from './JobPost.module.css'
import { useNavigate } from 'react-router-dom'
import image2 from '../../assets/images/Bg2.png'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { AddNewJob, UpdateJobPost } from '../../apis/job'
export default function JobPost() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [isEditExistingJobPost] = useState(false || state?.edit); 
  const [newJob,setNewJob] = useState({
    companyName:"" || state?.data.companyName,
    logoUrl:"" || state?.data.logoUrl,
    jobPosition:"" || state?.data.jobPosition,
    monthlySalary:"" || state?.data.monthlySalary,
    jobType:"" || state?.data.jobType,
    RemoteOffice:"" || state?.data.RemoteOffice,
    headCount:"" || state?.data.headCount,
    location:"" || state?.data.location,
    description:"" || state?.data.description,
    about:"" || state?.data.about,
    skills:"" || state?.data.skills.toString(),
    information:"" || state?.data.information
  })
  const handleChange = (e)=>{
    setNewJob({...newJob,[e.target.name]:e.target.value})
    //console.log(newJob)
  }
  const handleJobAdd = async (event)=>{
    event.preventDefault();
    if(!newJob.companyName || !newJob.logoUrl || !newJob.jobPosition ||!newJob.monthlySalary || !newJob.jobType || !newJob.RemoteOffice|| !newJob.headCount|| !newJob.location|| !newJob.description || !newJob.about || !newJob.skills || !newJob.information){
      alert("Please fill all details")
      return;
    }
    if(isEditExistingJobPost){
      if(!state.id) return;
      const response = await UpdateJobPost(state.id,{...newJob,skills: newJob.skills.split(",")})
      //console.log(response)
      setTimeout(() => {
        navigate(`/job-details/${state.id}`)
      }, 2000);
      
    }
    else{
    const response = await AddNewJob({...newJob,skills: newJob.skills.split(",")})
    //console.log(response.data)
    setNewJob({
      companyName:"",
      logoUrl:"",
      jobPosition:"",
      monthlySalary:"",
      jobType:"",
      RemoteOffice:"",
      headCount:"",
      location:"",
      description:"",
      about:"",
      skills:"",
      information:""
    })
    //console.log(newJob)
    }
  }
  const GoToHome = (e)=>{
    e.preventDefault()
    navigate("/")
  }
  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          {isEditExistingJobPost ? <>Edit</> : <>Add</>} job description</h1>
        <form className={styles.jobForm} onSubmit={(event) => handleJobAdd(event)}>
          <label htmlFor='Company Name'>Company Name</label><input type='text' placeholder='Enter your company name here' id='Company Name' name='companyName' value={newJob?.companyName} onChange={handleChange}/><br/>
          <label htmlFor='Logo'>Add logo URL</label><input type='text' placeholder='Enter the link' id='Logo' name='logoUrl' value={newJob?.logoUrl} onChange={handleChange}/><br/>
          <label htmlFor='Job Position'>Job Position</label><input type='text' placeholder='Enter job position' id='Job Position' name='jobPosition' value={newJob?.jobPosition} onChange={handleChange}/><br/>
          <label htmlFor='Monthly salary'>Monthly salary</label><input type='text' placeholder='Enter Amount in rupees' id='Monthly salary' name='monthlySalary' value={newJob?.monthlySalary} onChange={handleChange}/><br/>
          <label htmlFor='Job Type'>Job Type</label><select style={{width:"12vw",textAlign:"center"}}id='Job Type' name='jobType' value={newJob?.jobType} onChange={handleChange}>
              <option>Select</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              </select><br/>
          <label htmlFor='Remote/office'>Remote/office</label><select style={{width:"12vw",textAlign:"center"}} id='Remote/office' name='RemoteOffice' value={newJob?.RemoteOffice} onChange={handleChange}>
              <option>Select</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
              </select><br/>
          <label htmlFor='Head Count'>Head Count</label><input type='text' placeholder='Enter the Head Count in number' id='Head Count' name='headCount' value={newJob?.headCount} onChange={handleChange}/><br/>
          <label htmlFor='Location'>Location</label><input type='text' placeholder='Enter Location' id='Location' name='location' value={newJob?.location} onChange={handleChange}/><br/>
          <div style={{display:"flex"}}>
            <label htmlFor='Job Description'>Job Description</label><textarea placeholder='Type the job description' style={{height:"10vh",marginTop:"12px"}}id='Job Description' name='description' value={newJob?.description} onChange={handleChange}></textarea><br/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='About Company'>About Company</label><textarea placeholder='Type about your company' style={{height:"10vh",marginTop:"12px"}}id='About Company' name='about' value={newJob?.about} onChange={handleChange}></textarea><br/><br/>
          </div>
          <label htmlFor='Skills Required'>Skills Required</label><input type='text' placeholder='Enter the must have skills' id='Skills Required' name='skills' value={newJob?.skills} onChange={handleChange}/><br/>
          <label htmlFor='information'>Information</label><input type='text' placeholder='Enter the additional information' id='information' name='information' value={newJob?.information} onChange={handleChange}/><br/>
          <button className={styles.cancel} onClick={GoToHome}>Cancel</button>
          {isEditExistingJobPost ? <button className={styles.add} type='submit'>Edit Job</button> : 
          <button className={styles.add} type='submit'>+Add Job</button>
          }
        </form>
      </div>
      <div className={styles.right}>
          <img src={image2} style={{height:"100vh",width:"40vw"}}/>
          <ToastContainer/>
          <p>Recruiter add job details here</p>
      </div>
    </div>
  )
}
