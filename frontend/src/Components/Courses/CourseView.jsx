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
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { getCourseById, getCoursesById } from "../../api/courseApi";
import { postApplication } from "../../api/studentApplications";


export const CourseView = () => {

    const [course, setCourse] = useState({});
    const [resume, setResume] = useState(undefined);
    const [applying, setApplying] = useState(false);
    const [timeslots, setTimeslots] = useState([]);

    const [grade, setGrade] = useState(0);
    const [applicationTimes, setApplicationTimes] = useState([]);

    const [days] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);

    const [startTimes] = useState(["8:00 AM", "9:00 AM", "10:00 AM",
        "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"]);

    const [endTimes] = useState(["9:00 AM", "10:00 AM",
        "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]);

    const params = useParams();
    const navigate = useNavigate();

    const submitApplication = () => {
        postApplication(course, JSON.parse(localStorage.getItem("currUser")), grade, resume, applicationTimes)

        // comment out if testing connection
        setApplying(!applying)
        setApplicationTimes([])
        setGrade(0)
    }
    const checkTimeslot = (timeslot) => {
        // console.log("applicationTimes before",applicationTimes)
        let _appSlots = [...applicationTimes];
        if(_appSlots.indexOf(timeslot) !== -1)
        {
            let temp = _appSlots[0];
            let idx = _appSlots.indexOf(timeslot)
            _appSlots[0] = _appSlots[idx]
            _appSlots[idx] = temp;
            _appSlots.shift();
        }
        else
        {
            _appSlots.push(timeslot);
        }
        setApplicationTimes([..._appSlots]);
        // console.log("applicationTimes after",applicationTimes)
    }

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
                    <TableCell align="left" component="th" className="col-6">{course.description}</TableCell>
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

        {JSON.parse(localStorage.getItem("currUser")).role_id === 1 && !applying &&
            <div>
                <Button onClick={() => setApplying(!applying)}>
                    Apply Now
                </Button>
            </div>}

        {JSON.parse(localStorage.getItem("currUser")).role_id === 1 && applying &&
            <div className="col-12 p-3">
                <FormControl sx={{ m: 0 }} variant="outlined" className="mt-3 mb-2">
                    <InputLabel htmlFor="course-grade">Course Grade</InputLabel>
                    <OutlinedInput
                        id="course-grade"
                        type='number'
                        value={grade}
                        onChange={event => setGrade(event.target.value)}
                        label="Course Grade"
                    />
                </FormControl>
                {timeslots.map((timeslot) => {
                    return (
                        <div key={timeslot.id}>
                            <FormControlLabel control={<Checkbox
                                id={timeslot.id}
                                checked={applicationTimes.indexOf(timeslot) !== -1}
                                onChange={() => checkTimeslot(timeslot)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />} label={`${days[timeslot.day]}  ${startTimes[timeslot.start]}-${endTimes[timeslot.end]}`} />
    
                        </div>)
                })}
                <Button onClick={() => setApplying(!applying)}>
                    Cancel
                </Button>
                <Button onClick={() => submitApplication()}>
                    Submit
                </Button>
            </div>}
    </>;
}

