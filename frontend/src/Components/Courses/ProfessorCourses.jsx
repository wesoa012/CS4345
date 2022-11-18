import { Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export const ProfessorCourses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let currUser = JSON.parse(localStorage.getItem("currUser"))
        getCoursesByProfessorId(currUser.smu_id).then(async res => {
            setCourses([...res.data]);
        })
    }, []);

    if (!!courses) {
        return <div>

            {/* May want to add searching later, but for now its ok */}
            {/* <div className="container border-0 mt-3">
                <div className="container border-0 col-3 float-start">


                    
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="smu-id">SMU ID</InputLabel>
                        <OutlinedInput
                            id="smu-id"
                            type='text'
                            value={smu_id}
                            onChange={event => setSmu_id(event.target.value)}
                            label="SMU ID"
                        />
                    </FormControl>

                </div>
                <div className="clearfix"></div>
            </div> */}

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="center">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((coures, idx) => {

                        return (<TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {course.course_name}
                            </TableCell>
                            <TableCell align="left">{course.course_id}</TableCell>
                            <TableCell align="right">
                                {course.desription.length <= 25 && `${course.desription}`}
                                {course.desription.length > 25 && `${course.desription.substring(0, 22)}...`}
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate(`/courses/${course.course_id}`)}>
                                    View Course
                                </Button>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    }
    else {
        return <>Loading Courses...</>
    }
}