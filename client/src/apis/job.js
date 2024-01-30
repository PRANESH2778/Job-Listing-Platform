import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';
const backendUrl = 'http://localhost:2000';
export const AddNewJob = async ({companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information})=>{
    try {
        const reqUrl = `${backendUrl}/job/create`;
        const reqPayload = {companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information}
        const token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = token
        const response = await axios.post(reqUrl,reqPayload);
        console.log(response)
        toast.success(response.data.message)
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}
export const UpdateJobPost = async (jobId,{companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information})=>{
    try {
        const reqUrl = `${backendUrl}/job/edit/${jobId}`;
        const reqPayload = {companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information}
        const token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = token
        const response = await axios.put(reqUrl,reqPayload);
        console.log(response)
        toast.success(response.data.message)
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}
export const getAllJobs = async({skills,jobPosition})=>{
    try {
        const reqUrl = `${backendUrl}/job/all?skills=${skills}&jobPosition=${jobPosition}`;
        const response = await axios.get(reqUrl)
        //console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        //create a toast message
    }
}
export const getJobDetails = async(jobId)=>{
    try {
        const reqUrl = `${backendUrl}/job/job-description/${jobId}`;
        const response = await axios.get(reqUrl)
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error)
        //create a toast message
    }
}
export const viewAllJobs = ()=>{
    try {
        const reqUrl = `${backendUrl}/job/all`
        const response = axios.get(reqUrl)
        //console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}