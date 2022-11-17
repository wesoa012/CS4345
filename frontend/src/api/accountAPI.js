import axios from 'axios';
// import Cookies from 'js-cookie';
axios.defaults.withCredentials = true
export const WS_ENDPOINT = "ws://localhost:8000";
export const BACKEND_ENDPOINT = "http://localhost:8000";

export const changeRoleId = async (smu_id, new_role) =>  {
    console.log("Registering...");

    const res = await axios.put(`${BACKEND_ENDPOINT}/accounts/${smu_id}/role`, {new_role: new_role});
    if(res.status !== 200){
        console.log(`Couldn't change role_id. ${res.status}`)
        return null;
    }
    console.log(res)
    return res;
};

export const getAllAccounts = async () => {
    console.log("Getting All Accounts - Frontend")
    const res = await axios.get(`${BACKEND_ENDPOINT}/accounts`);

}

