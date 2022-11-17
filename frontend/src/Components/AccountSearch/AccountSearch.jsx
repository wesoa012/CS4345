import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { changeRoleId, getAllAccounts, getAccountbyId } from "../../api/accountAPI";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

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
        if (curr_user.role_id !== 3) {
            window.alert("Bruh, you ain't an admin")
            navigate("/");
        }
        else {
            console.log("Getting Accounts");
            getAllAccounts().then(async acctRes => {
                let temp_accounts = [];
                for (const i in acctRes.data) {
                    let account = acctRes.data[i]
                    if (account.smu_id !== curr_user.smu_id) {
                        temp_accounts.push(account);
                    }
                }
                console.log("temp_accounts", temp_accounts);
                setAccounts(temp_accounts);
                console.log("Accounts =", accounts)
            });
        }
    }, []);

    const setAcctType = (account, new_role) => {
        console.log("account before role change =", account)
        let _accounts = [...accounts];
        _accounts[_accounts.indexOf(account)].role_id = new_role;
        setAccounts(_accounts);
        console.log("account after role change =", account)
        console.log("frontend new role =",new_role)
        changeRoleId(account.smu_id, new_role)
    }

    if (!!accounts && accounts.length !== 0) {
        return <div>
            <div className="container border-0 mt-3">
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

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>SMU ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                        <TableCell align="center">Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((account, idx) => {

                        return <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {account.smu_id}
                            </TableCell>
                            <TableCell align="left">{account.first_name} {account.last_name}</TableCell>
                            <TableCell align="right">&nbsp;</TableCell>
                            <TableCell align="center">
                                <Select
                                    value={account.role_id}
                                    displayEmpty
                                    onChange={event => setAcctType(account, event.target.value)}
                                >
                                    <MenuItem value={1}>Student</MenuItem>
                                    <MenuItem value={2}>Professor</MenuItem>
                                    <MenuItem value={3}>Admin</MenuItem>
                                </Select>
                            </TableCell>

                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    }
    else {
        return <>Loading Accounts...</>
    }
}