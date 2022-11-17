import axios from 'axios';
// import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
export const WS_ENDPOINT = "ws://localhost:8000";
export const BACKEND_ENDPOINT = "http://localhost:8000";

export const getCourses = async () => {

    const res = await axios.get(`${BACKEND_ENDPOINT}/courses`);

    if(res.status !== 201){
        console.log(`Couldn't get courses. ${res.status}`)
        return null;
    }
    return res;

};

export const addCourse = async (course) => {
    const res = await axios.post(`${BACKEND_ENDPOINT}/courses`, course);

    if(res.status !== 201){
        console.log(`Couldn't add course. ${res.status}`)
        return null;
    }
    return res;
}