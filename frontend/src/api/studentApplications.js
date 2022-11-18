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

export const postApplication = async (course, currUser, grade, resume, timeslots) =>  {
    console.log("submitting application");
    let object = {course: course, currUser: currUser, grade: grade, resume: resume, timeslots: timeslots}
    const res = await axios.post(`${BACKEND_ENDPOINT}/applications`, object);
    if(res.status !== 201){
        console.log(`Couldn't post your application. ${res.status}`)
        return null;
    }
    else
    {
        console.log("sucessfully posted application")
    }
    return res;
};