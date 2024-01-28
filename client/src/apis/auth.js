import axios from 'axios'
const backendUrl = "http://localhost:2000";
export const registerUser = async ({ name , email , mobile , password})=>{
    try {
        const reqUrl = `${backendUrl}/auth/register`;
        const reqPayload = {name,email,mobile,password}
        const response = await axios.post(reqUrl,reqPayload)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        //create a toast message
    }
}

export const loginUser = async ({email,password})=>{
    try {
        const reqUrl = `${backendUrl}/auth/login`;
        const reqPayload = {email,password};
        const response = await axios.post(reqUrl,reqPayload);
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}