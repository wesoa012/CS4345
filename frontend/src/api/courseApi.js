import axios from 'axios';
// import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
export const WS_ENDPOINT = "ws://localhost:8000";
export const BACKEND_ENDPOINT = "http://localhost:8000";

export const getCourses = async () => {

    const res = await axios.get(`${BACKEND_ENDPOINT}/courses`);

    if (res.status !== 201) {
        console.log(`Couldn't get courses. ${res.status}`)
        return null;
    }
    return res;

};

export const addCourse = async (course, currUser) => {
    let object = { course: course, professor: currUser };
    console.log("outgoing object =", object)
    const res = await axios.post(`${BACKEND_ENDPOINT}/courses`, object);


    if (res.status !== 201) {
        console.log(`Couldn't add course. ${res.status}`)
        return null;
    }
    else {
        console.log("sucessfully created course");
        return res;
    }

}

export const getCoursesByProfessorId = async (professor_id) => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/accounts/${professor_id}/courses`);
    if (res.status !== 201) {
        console.log(`Couldn't get professor courses. ${res.status}`)
        return null;
    }
    else {
        console.log("Got the courses");
        return res;
    }
}