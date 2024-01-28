import React, { useEffect, useState } from 'react'
import styles from './JobDetails.module.css'
import { useNavigate } from 'react-router-dom'
import { getJobDetails } from '../../apis/job'
import money from '../../assets/images/money.png'
import Google from '../../assets/images/Google.png'
import recruiter from '../../assets/images/recruiter.png'
import shape1 from '../../assets/images/shape1.png'
import shape2 from '../../assets/images/shape2.png'
import shape3 from '../../assets/images/shape3.png'

export default function JobDetails() {
  const [data,setData] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    getJobDetailsById();
  },[])
  const GoToLogin = ()=>{
    navigate('/login')
  }
  const GoToRegister = ()=>{
    navigate('/register')
  }
  const getJobDetailsById = async()=>{
    const jobId = window.location.pathname?.split("/").slice(-1)[0];
    console.log(jobId)
    if(!jobId) return;
    const response = await getJobDetails(jobId);
    //console.log(response)
    setData(response)
  }
  const stringSkills = data.skills ? data.skills.join(", ") : '';
  const [userName,setUserName] = useState("pranesh")
  const uname = localStorage.getItem("name")

  return (
    <>
    {data ? (
      <>
    <div className={styles.main}>
      <div className={styles.top}>
         <div className={styles.heading}>
          <p className={styles.jobFinder}>Jobfinder</p>
          <img src={shape1} className={styles.shape1}/>
          <img src={shape2} className={styles.shape2}/>
          <img src={shape3}className={styles.shape3}/>
          {userName ? <div><p className={styles.logOut}>Logout</p><p className={styles.name}>Hello {userName}</p><img src={recruiter} height="30px" width="30px" style={{position:"absolute",right:"10rem",top:"1rem"}}/></div> : 
          <div>
            <button className={styles.loginBtn} onClick={GoToLogin}>Login</button>
            <button className={styles.RegBtn} onClick={GoToRegister}>Register</button>
          </div>
            }
         </div>

         <div className={styles.jobTitle}><h2 style={{marginTop:"1rem"}}>{data.jobPosition}&nbsp;at&nbsp;{data.companyName}</h2></div>
      </div>
      <div className={styles.down}>
        <div className={styles.fullDetails}>
        <p>1w ago&nbsp;&nbsp;.&nbsp;&nbsp;{data.jobType}&nbsp;&nbsp;.&nbsp;&nbsp;<img src={Google} style={{height:"25px",width:"25px"}}/>&nbsp;&nbsp;Google</p>
        <h1 style={{color:"black"}}>{data.jobPosition}</h1>
        <p style={{marginTop:"0"}}>{data.location}|India</p>
        <p><img src={money} style={{height:"20px",width:"20px"}}/>&nbsp;Salary<br/>Rs.{data.monthlySalary}/month</p>
        <h3 style={{color:"black"}}>About Company</h3>
        <p>{data.about}</p>
        <h3 style={{color:"black"}}>About the job/internship</h3>
        <p>{data.description}</p>
        <h3 style={{color:"black"}}>Skill(s) reqUired</h3>
        <div><p>{stringSkills}</p></div>
        <h3 style={{color:"black"}}>Additional information</h3>
        <p>{data.information}</p>
        {userName ? <button className={styles.editBtn} onClick={
          ()=>{
            navigate("/job-post",{
              state:{id:data._id,data:data,edit:true}
            })
          }}>Edit Job</button>:<></>}
        </div>
      </div>
      
    </div></>):<></>
          }
          </>
  )
}
