import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../../apis/job';
//import { viewAllJobs } from '../../apis/job';
import { DEFAULT_SKILLS } from '../../utils/constant';
import styles from './Home.module.css';
import recruiter from '../../assets/images/recruiter.png'
import image3 from '../../assets/images/search.png';
import logo from '../../assets/images/logo1.png'
import flag from '../../assets/images/flag.png'
import Head from '../../assets/images/members.png'
import shape1 from '../../assets/images/shape1.png'
import shape2 from '../../assets/images/shape2.png'
import shape3 from '../../assets/images/shape3.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [skills, setSkills] = useState([]);
  const [userName,setUserName] = useState(false)
  const [search,setSearch] = useState()
  const [jobDetails,setJobDetails] = useState([]);
  const [allSkills,setAllSkills] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    fetchAllJobs();
    userLogged();
 },[skills])
  const handleSearch = (e)=>{
  setSearch(e.target.value)
  }
  const handleKeyDown = (e)=>{
    if(!search?.trim()){
      return;
    }
    if(e.keyCode === 13){
      fetchAllJobs();
    }
  }
  const selectSkills = (e) => {
    if(!e.target.value) return;
    const selectedSkill = skills.filter((skill)=>skill === e.target.value);
    if(!selectedSkill.length){
      setSkills([...skills, e.target.value]);
    }
    console.log(skills);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  const clearSkills = ()=>{
    setSkills([]);
  }
  const GoToLogin = ()=>{
    navigate('/login')
  }
  const GoToRegister = ()=>{
    navigate('/register')
  }
  const fetchAllJobs = async()=>{
      const reqPayload = {
        skills:skills.join(","),
        jobPosition:search?.trim(),
      }
      console.log(reqPayload)
      const result = await getAllJobs(reqPayload);
      console.log(result)
      setJobDetails(result);
      //console.log(jobDetails)
    }

  const userLogged = ()=>{
    setUserName(localStorage.getItem("name"));
  }
  console.log(jobDetails)
  const handleAddJob = ()=>{
    navigate("/job-post")
  }
  const LogOut = ()=>{
    const removeItem = ["name","token"]
    removeItem.forEach((item)=>{
      localStorage.removeItem(item)
    })
    toast.success("Logged Out Successfully!")
    setTimeout(() => {
      location.reload()
    }, 2000);
   
 }

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <p className={styles.jobFinder}>Jobfinder</p>
        <img src={shape1} className={styles.shape1}/>
        <img src={shape2} className={styles.shape2}/>
        <img src={shape3}className={styles.shape3}/>
        {userName ? <div><p className={styles.logOut} onClick={LogOut}>Logout</p><p className={styles.name}>Hello {userName}</p><img src={recruiter} height="30px" width="30px" style={{position:"absolute",right:"10rem",top:"2.5rem"}}/></div> : 
          <div>
            <button className={styles.loginBtn} onClick={GoToLogin}>Login</button>
            <button className={styles.RegBtn} onClick={GoToRegister}>Register</button>
          </div>
            }
      </div>
      <div className={styles.down}>
        <div className={styles.filter}>
          <input type='text' placeholder='Type any job title' name='search' onChange={handleSearch} onKeyDown={handleKeyDown}/>
          <img src={image3} alt='Search Icon' />
          <div className={styles.searchDiv}>
          <select onChange={selectSkills}>
            <option value="">Skills</option>
            {DEFAULT_SKILLS.map((skill)=>(
              <option key = {skill} value={skill}>{skill}</option>
            ))}
          </select>
          <div className={styles.skillDisplay}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <span>{skill}</span>
                <button onClick={() => removeSkill(index) } className={styles.remove}>X</button>
              </div>
            ))}
          </div>
          
          <button className={styles.clear} onClick={clearSkills}>Clear</button>
          {userName ? <button className={styles.newJobBtn} onClick={handleAddJob}>+ Add Job</button> : <></>}
          
          </div>
        </div>
        <div className={styles.jobDisplay}>
          {jobDetails.map((jobs)=>(
              <div className={styles.jobList}>
              <img src={jobs.logoUrl} style={{height:"10vh",width:"5vw",padding:"1.5rem",marginLeft:"0"}}/>
              <div className={styles.jobDetail1}>
                  <h3 className={styles.heading}>{jobs.jobPosition}</h3>
                  <p className={styles.count} style={{color:"#9C9C9C"}}><img src={Head}/>{jobs.headCount}&nbsp;&nbsp;&nbsp;&nbsp;₹{jobs.monthlySalary}&nbsp;&nbsp;&nbsp;&nbsp;<img src={flag} style={{height:"20px",width:"20px",margin:"0"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{jobs.location}</p>
                  <p style={{color:"#ED5353"}}>{jobs.RemoteOffice}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{jobs.jobType}</p>
              </div>
              <div className={styles.jobDetail2}>
                  <div className={styles.skillSet}>
                    {jobs.skills.map((skill)=>(
                      <div className={styles.jobSkills}>{skill}</div>
                    ))}
                  </div>
                  {userName ? <div className={styles.buttons}>
                    <button className={styles.editBtn}>Edit Jobs</button>
                    <button className={styles.addBtn}>View Details</button>
                  </div> :<button className={styles.ViewBtn}>View Details</button>
                  }
              </div>
          </div>
          ))}
        </div>
      </div>
      <ToastContainer/>

    </div>
  );
}
