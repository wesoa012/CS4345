import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { getUserSubmittedApplications } from "../../api/studentApplications";

export const SubmittedApplications = () => {
    const [currUser, setCurrUser] = useState({ ...JSON.parse(localStorage.getItem("currUser")) });
    const [applications, setApplications] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (currUser === undefined || currUser === "{}") {
            navigate('/');
        }
        else {
            let credentials = { smu_id: currUser.smu_id, token: currUser.token }
            getUserSubmittedApplications(credentials).then(res => {
                if (application_list !== null) {
                    setApplications([...application_list]);
                }
            }
            ).catch(() => { console.log("Error occured while grabbing submitted applications") });

        }
    }, []);

    return (<div className="Dashboard">
        <table className="table col-12 row">
            <thead>
                <tr className="row">
                    <th>
                        Class Number
                    </th>
                    <th>
                        Professor
                    </th>
                    <th>
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {applications.length>0 && applications.map(application=>{
                    return (
                        <tr className="row">
                            <td>
                                {application.course_num}
                            </td>
                            <td>
                                {application.professor_name}
                            </td>
                            <td>
                                {application.course_description}
                            </td>
                        </tr>)
                }) }
            </tbody>
        </table>
    </div >)
}