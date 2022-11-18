import { addCourse } from "../../api/courseApi";
import { TextAreaField } from "../Common/textAreaField";
import { TextField } from "../Common/textField";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';

import Textarea from '@mui/joy/Textarea';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

export const AddCourse = () => {

    const navigate = useNavigate();

    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [timeslots, setTimeslots] = useState([{ day: "", start: "", end: "" }])
    const [syllabus, setSyllabus] = useState(0); //FIXME how to implement this?? 
    // ^ Not implementing yet, but will an upload field ^

    const addToLength = () => {
        let _timeslots = [...timeslots];
        _timeslots.push({ day: "", start: "", end: "" })
        setTimeslots([..._timeslots])
    }

    const removeFromLength = () => {
        let _timeslots = [...timeslots];
        _timeslots.pop();
        setTimeslots([..._timeslots]);
    }

    const addCourseFunct = () => {
        addCourse({ courseName, description, syllabus, timeslots }, JSON.parse(localStorage.getItem("currUser")))
            .then(async res => {
                if (res.status !== 201) {
                    console.log("Error creating course", res)
                }
                else {
                    console.log("Sucessfully created course", res)
                    navigate(`/`);
                }
            })
    }

    const changeDay = (timeslot, day) => {
        let _timeslots = [...timeslots];
        _timeslots[_timeslots.indexOf(timeslot)].day = day;
        setTimeslots([..._timeslots])
    }

    const changeStartTime = (timeslot, start) => {
        let _timeslots = [...timeslots];
        _timeslots[_timeslots.indexOf(timeslot)].start = start;
        setTimeslots([..._timeslots])
    }

    const changeEndTime = (timeslot, end) => {
        console.log("Before change end =", timeslots)
        let _timeslots = [...timeslots];
        _timeslots[_timeslots.indexOf(timeslot)].end = end;
        console.log("After change end =", timeslots)
        setTimeslots([..._timeslots])
    }

    return <div className="col-12 p-3">
        <div className="m-1">
            <FormControl sx={{ m: 0, width: '100%' }} variant="outlined" className="">
                <InputLabel htmlFor="course-name">Course Name</InputLabel>
                <OutlinedInput
                    id="course-name"
                    type='text'
                    value={courseName}
                    onChange={event => setCourseName(event.target.value)}
                    label="Course Name"
                />
            </FormControl>
        </div>
        <div className="m-1">
            <FormControl sx={{ m: 0, width: '100%' }} variant="outlined">
                <Textarea minRows={5} id="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder="Description"
                />
            </FormControl>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Day</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">End Time</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {timeslots.map((timeslot, idx) => {
                    return (
                        <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="day-label">Day</InputLabel>
                                    <Select
                                        labelId="day-label"
                                        id="day"
                                        value={timeslot.day}
                                        label="Day"
                                        onChange={event => changeDay(timeslot, event.target.value)}
                                    >
                                        <MenuItem value={1}>Monday</MenuItem>
                                        <MenuItem value={2}>Tuesday</MenuItem>
                                        <MenuItem value={3}>Wednesday</MenuItem>
                                        <MenuItem value={4}>Thursday</MenuItem>
                                        <MenuItem value={5}>Friday</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="left">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="start-time-label">Start Time</InputLabel>


                                    <Select
                                        labelId="start-time-label"
                                        id="start-time"
                                        value={timeslot.start}
                                        label="Start Time"
                                        onChange={event => changeStartTime(timeslot, event.target.value)}
                                    >
                                        <MenuItem value={1}>8:00 AM</MenuItem>
                                        <MenuItem value={2}>9:00 AM</MenuItem>
                                        <MenuItem value={3}>10:00 AM</MenuItem>
                                        <MenuItem value={4}>11:00 AM</MenuItem>
                                        <MenuItem value={5}>12:00 PM</MenuItem>
                                        <MenuItem value={6}>1:00 PM</MenuItem>
                                        <MenuItem value={7}>2:00 PM</MenuItem>
                                        <MenuItem value={8}>3:00 PM</MenuItem>
                                        <MenuItem value={9}>4:00 PM</MenuItem>
                                        <MenuItem value={10}>5:00 PM</MenuItem>
                                        <MenuItem value={11}>6:00 PM</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="left">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="end-time-label">End Time</InputLabel>
                                    <Select
                                        labelId="end-time-label"
                                        id="end-time"
                                        value={timeslot.end}
                                        label="End Time"
                                        onChange={event => changeEndTime(timeslot, event.target.value)}
                                    >
                                        <MenuItem value={1}>9:00 AM</MenuItem>
                                        <MenuItem value={2}>10:00 AM</MenuItem>
                                        <MenuItem value={3}>11:00 AM</MenuItem>
                                        <MenuItem value={4}>12:00 PM</MenuItem>
                                        <MenuItem value={5}>1:00 PM</MenuItem>
                                        <MenuItem value={6}>2:00 PM</MenuItem>
                                        <MenuItem value={7}>3:00 PM</MenuItem>
                                        <MenuItem value={8}>4:00 PM</MenuItem>
                                        <MenuItem value={9}>5:00 PM</MenuItem>
                                        <MenuItem value={10}>6:00 PM</MenuItem>
                                        <MenuItem value={11}>7:00 PM</MenuItem>
                                        <MenuItem value={12}>8:00 PM</MenuItem>
                                        <MenuItem value={13}>9:00 PM</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => removeFromLength()}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        <div className="row TimeSlotAddition">
            <Button variant="contained" onClick={() => addToLength()}>Add Timeslot</Button>
        </div>
        <br />
        <div className="text-center">
            <Button variant="contained" className="btn btn-primary" onClick={() => {
                addCourseFunct()
            }}>Submit</Button>
        </div>
        <br />
        <div className="text-center">
            <Button variant="contained" className="btn btn-primary" onClick={() => {
                navigate('/')
            }}>Cancel</Button>
        </div>

    </div >;
}