import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';
const backendUrl = "http://localhost:2000";
export const registerUser = async ({ name , email , mobile , password})=>{
    try {
        const reqUrl = `${backendUrl}/auth/register`;
        const reqPayload = {name,email,mobile,password}
        const response = await axios.post(reqUrl,reqPayload)
        console.log(response)
        toast.success("User registered successfully")
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        //create a toast message
    }
}

export const loginUser = async ({email,password})=>{
    try {
        const reqUrl = `${backendUrl}/auth/login`;
        const reqPayload = {email,password};
        const response = await axios.post(reqUrl,reqPayload);
        console.log(response)
        toast.success(response.data.message)
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}