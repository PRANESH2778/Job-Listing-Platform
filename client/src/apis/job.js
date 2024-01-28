import axios from 'axios'
const backendUrl = 'http://localhost:2000';
export const AddNewJob = async ({companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information})=>{
    try {
        const reqUrl = `${backendUrl}/job/create`;
        const reqPayload = {companyName,logoUrl,jobPosition,monthlySalary,jobType,RemoteOffice,headCount,location,description,about,skills,information}
        const token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = token
        const response = await axios.post(reqUrl,reqPayload);
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
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
        return response
    } catch (error) {
        console.log(error)
    }
}
export const getAllJobs = ({skills,jobPosition})=>{
    try {
        const reqUrl = `${backendUrl}/all?skill=${skills}&jobPosition=${jobPosition}`;
        const response = axios.get(reqUrl,reqPayload)
        console.log(response)
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