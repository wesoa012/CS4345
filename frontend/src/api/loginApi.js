import axios from 'axios';
// import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
export const WS_ENDPOINT = "ws://localhost:8000";
export const BACKEND_ENDPOINT = "http://localhost:8000";

export var currentUser = undefined;

export const registerAccount = async (credentials) =>  {
    console.log("Registering...");

    const res = await axios.post(`${BACKEND_ENDPOINT}/register`, credentials);
    if(res.status !== 201){
        console.log(`Couldn't register. ${res.status}`)
        return null;
    }
    console.log(res)
    return res;
};

export const logIntoAccount = async (user) => {
    console.log("Logging in... with credentials =", user);
    const res = await axios.post(`${BACKEND_ENDPOINT}/login`, user);
    if(res.status !== 200){
        console.log(`Couldn't log in. ${res.status}`)
        return null;
    }
    currentUser = res;
    return res.data;
};

export const logout = async () => {
    localStorage.currUser = "{}";
    return;
    // try {
    //     const res = await axios.get(`${BACKEND_ENDPOINT}/api/account/logout`);
    //     Cookies.remove("account_id");
    // } catch(e) {
    //     console.log(`Failed to logout.: ${e}`)
    // }
}