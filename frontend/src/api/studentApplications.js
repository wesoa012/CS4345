import axios from 'axios';
// import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
export const WS_ENDPOINT = "ws://localhost:8000";
export const BACKEND_ENDPOINT = "http://localhost:8000";

export const getUserSubmittedApplications = async (credentials) =>  {
    console.log("Registering...");

    const res = await axios.get(`${BACKEND_ENDPOINT}/account/:id/applications`, credentials);
    if(res.status !== 201){
        console.log(`Couldn't get applications. ${res.status}`)
        return null;
    }
    return res;
};