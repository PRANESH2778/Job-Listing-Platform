import React, { useState } from 'react'
import styles from './JobPost.module.css'
import image2 from '../../assets/images/Bg2.png'
import { useLocation } from 'react-router-dom'
import { AddNewJob, UpdateJobPost } from '../../apis/job'
import { json } from 'react-router-dom'
import axios from 'axios'
export default function JobPost() {
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
      console.log(response)
    }
    else{
    const response = await AddNewJob({...newJob,skills: newJob.skills.split(",")})
    console.log(response.data)
    }
  }
  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          {isEditExistingJobPost ? <>Edit</> : <>Add</>} job description</h1>
        <form className={styles.jobForm}>
          <label>Company Name</label><input type='text' placeholder='Enter your company name here' name='companyName' value={newJob?.companyName} onChange={handleChange}/><br/>
          <label>Add logo URL</label><input type='text' placeholder='Enter the link' name='logoUrl' value={newJob?.logoUrl} onChange={handleChange}/><br/>
          <label>Job Position</label><input type='text' placeholder='Enter job position' name='jobPosition' value={newJob?.jobPosition} onChange={handleChange}/><br/>
          <label>Monthly salary</label><input type='text' placeholder='Enter Amount in rupees' name='monthlySalary' value={newJob?.monthlySalary} onChange={handleChange}/><br/>
          <label>Job Type</label><select style={{width:"12vw",textAlign:"center"}} name='jobType' value={newJob?.jobType} onChange={handleChange}>
              <option>Select</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              </select><br/>
          <label>Remote/office</label><select style={{width:"12vw",textAlign:"center"}} name='RemoteOffice' value={newJob?.RemoteOffice} onChange={handleChange}>
              <option>Select</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
              </select><br/>
          <label>Head Count</label><input type='text' placeholder='Enter the Head Count in number' name='headCount' value={newJob?.headCount} onChange={handleChange}/><br/>
          <label>Location</label><input type='text' placeholder='Enter Location' name='location' value={newJob?.location} onChange={handleChange}/><br/>
          <div style={{display:"flex"}}>
            <label>Job Description</label><textarea placeholder='Type the job description' style={{height:"10vh",marginTop:"12px"}} name='description' value={newJob?.description} onChange={handleChange}></textarea><br/>
          </div>
          <div style={{display:"flex"}}>
            <label>About Company</label><textarea placeholder='Type about your company' style={{height:"10vh",marginTop:"12px"}} name='about' value={newJob?.about} onChange={handleChange}></textarea><br/><br/>
          </div>
          <label>Skills Required</label><input type='text' placeholder='Enter the must have skills' name='skills' value={newJob?.skills} onChange={handleChange}/><br/>
          <label>Information</label><input type='text' placeholder='Enter the additional information' name='information' value={newJob?.information} onChange={handleChange}/><br/>
          <button className={styles.cancel}>Cancel</button>
          {isEditExistingJobPost ? <button className={styles.add} onClick={handleJobAdd}>Edit Job</button> : 
          <button className={styles.add} onClick={handleJobAdd}>+Add Job</button>
          }
        </form>
      </div>
      <div className={styles.right}>
          <img src={image2} style={{height:"100vh",width:"40vw"}}/>
          <p>Recruiter add job details here</p>
      </div>
    </div>
  )
}
