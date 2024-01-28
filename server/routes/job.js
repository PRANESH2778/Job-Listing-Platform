const express = require('express')
const router = express.Router();
const jwtVerify = require('../middlewares/authMiddleware')
const Job = require('../models/Job')
router.post('/create',jwtVerify,async (req,res)=>{
    try{
        const {companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information} = req.body
        if(!companyName || !logoUrl || !jobPosition ||!monthlySalary || !jobType || !RemoteOffice||!headCount|| !description || !about || !skills || !information ){
            return res.status(402).json({message:"bad request"})
        }
        jobDetails = new Job({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            RemoteOffice,
            headCount,
            location,
            description,
            about,
            skills,
            information,
            refUserId: req.body.userId,
        })
        await jobDetails.save();
        res.status(200).json({message:"company details added"})
    }catch(error){
        console.log(error)
    }
})
router.put('/edit/:jobId',jwtVerify,async (req,res)=>{
    try{
        const {companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information} = req.body
        const jobId = req.params.jobId
        if(!companyName || !logoUrl || !jobPosition ||!monthlySalary || !jobType || !RemoteOffice|| !headCount|| !location|| !description || !about || !skills || !information){
            return res.status(402).json({message:"bad request"})
        }
        //updating the job details using specific job id
        await Job.updateOne({_id:jobId},{
            //$set is used to edit the details in database
            $set:{
                companyName,
                logoUrl,
                jobPosition,
                monthlySalary,
                jobType,
                RemoteOffice,
                headCount,
                location,
                description,
                about,
                skills,
                information,
            },
        })
        res.status(200).json({message:"company details updated"})
    }catch(error){
        console.log(error)
    }
})
router.get('/job-description/:jobId',async (req,res)=>{
    try{
        //get job id using req.params
        const jobId = req.params.jobId
        if(!jobId){
            return res.status(402).json({message:"bad request"})
        }
        const jobDetails = await Job.findById(jobId)
        res.status(200).json({data:jobDetails})
    }catch(error){
        console.log(error)
    }
})
router.get('/all',async (req,res)=>{
    try{
        //in home page we need to display all job details
        //get which the user needs to search
        const jobPosition = req.query.jobPosition || "";
        const skills = req.query.skills;
        //skills? is used to check if the skills is not empty
        //split is used to send the skills as array as the skills will coming as strings
        let filterSkills = skills?.split(",");
        let filter = {};
        if(filterSkills){
            //$in operator go to each operator
            filter = {skills:{$in :[...filterSkills]}};
        }

       
        const jobList = await Job.find(
            {jobPosition:{$regex:jobPosition,$options:"i"},
            ...filter, 
            },
            {});
        res.status(200).json(jobList)
    }catch(error){
        console.log(error)
    }
})

module.exports = router