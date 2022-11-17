import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { changeRoleId, getAllAccounts, getAccountbyId } from "../../api/accountAPI";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

export const AccountSearch = () => {

    const [accounts, setAccounts] = useState(false);
    const [smu_id, setSmu_id] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        let curr_user = JSON.parse(localStorage.getItem("currUser"));
        if(curr_user.role_id !== 3)
        {
            window.alert("Bruh, you ain't an admin")
            navigate("/");
        }
        else
        {
            console.log("Getting Accounts");
            var temp_accounts = [];
            getAllAccounts().then(async acctRes => {
                console.log("Getting requests")
                for (const i in acctRes) {
                    let account = await getAccountbyId(acctRes[i].account_id)
                    if(account.smu_id !== curr_user.smu_id)
                    {
                        temp_accounts.push(account);
                    }
                }
                console.log("temp_accounts", temp_accounts);
                setAccounts(temp_accounts);
            });
        }
    }, []);

    const setAcctType = (account, new_role) => {
        accounts.find(account).role_id = new_role;
        changeRoleId(account.id, new_role)
    }

    if (!!accounts && accounts.length !== 0) {
        return <div>
            <div className="container border-0 mt-3">
                {enrollable() && <button type="button" className="float-end btn btn-success mt-3" onClick={() => goToSchedule()}>Schedule</button>}
                <div className="container border-0 col-3 float-start">

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">SMU ID</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type='text'
                    value={smu_id}
                    onChange={event => setSmu_id(event.target.value)}
                    label="SMU ID"
                />
            </FormControl>
                    
                </div>
                <div className="clearfix"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th className="col-4">SMU ID</th>
                        <th className="col-4">Name</th>
                        <th className="col-3"></th>
                        <th className="col-1">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, idx) => {
                        return (find(account) && <tr key={idx} className="container">
                            <td>{account.smu_id}</td>
                            <td>{account.first_name} {account.last_name}</td>
                            <select
                            onChange={event => setAcctType(account, event.target.value)}>
                                
                            </select>
                            {account.role_id === 1 && <td>Student</td>}
                            {account.role_id === 2 && <td>Professor</td>}
                            {account.role_id === 3 && <td>Admin</td>}
                            

                            {/* <td className="col-3">
                                <Button variant="contained"
                                    className="btn bg-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToStudent(student)}>
                                    View account
                                </Button>
                            </td> */}

                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    }
    else {
        return <>Loading Accounts...</>
    }
}