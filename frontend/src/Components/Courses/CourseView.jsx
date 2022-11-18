import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCourseById, getCoursesById } from "../../api/courseApi";

export const CourseView = () => {

    const [course, setCourse] = useState({});
    const [applying, setApplying] = useState(false);
    const [timeslots, setTimeslots] = useState([]);

    const [days] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);

    const [startTimes] = useState(["8:00 AM", "9:00 AM", "10:00 AM",
        "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"]);

    const [endTimes] = useState(["9:00 AM", "10:00 AM",
        "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]);

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        let currUser = JSON.parse(localStorage.getItem("currUser"))
        getCourseById(params.id)
            .then(async res => {
                console.log("course info =", res.data)
                setTimeslots([...res.data.timeslots])
                setCourse(res.data);
            })
            .catch((err) => {
                console.log("Error =", err)
            })
    }, []);

    return <>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="left" component="th">{course.course_name}</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="left" component="th">{course.description}</TableCell>
                    <TableCell align="right">
                        <Box display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            <Table sx={{ maxWidth: '50%' }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Days</TableCell>
                                        <TableCell align="left">Start Times</TableCell>
                                        <TableCell align="left">End Times</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timeslots.map((timeslot) => {
                                    return (
                                        <TableRow key={timeslot.id} >
                                            {console.log(timeslot)}
                                            <TableCell align="left">
                                                {days[timeslot.day]}
                                            </TableCell>
                                            <TableCell align="left">
                                                {startTimes[timeslot.start]}
                                            </TableCell>
                                            <TableCell align="left">
                                                {endTimes[timeslot.end]}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                </TableBody>
                            </Table>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </>;
}

