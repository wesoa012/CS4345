import { addCourse } from "../../api/courseApi";
import { TextAreaField } from "../Common/textAreaField";
import { TextField } from "../Common/textField";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export const AddCourse = () => {

    const navigate = useNavigate();

    const [ profID, setProfID ] = useState('');
    const [ courseID, setCourseID ] = useState('');
    const [ courseName, setCourseName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ syllabus, setSyllabus ] = useState(0); //FIXME how to implement this??

    return <>
        <TextField label="Professor ID" 
                    value={profID}
                    setValue={setProfID}/>
        <TextField label="Course ID"
                    value={courseID}
                    setValue={setCourseID}/>
        <TextField label="Course Name"
                    value={courseName}
                    setValue={setCourseName}/>
        <TextAreaField label="Description"
                        value={description}
                        setValue={setDescription}/>

        <Button className="btn btn-primary" onClick={() => {
            addCourse({courseID, courseName, description, profID, syllabus});
            setProfID('');
            setCourseID(''); //FIXME are these even necessary if leaving the page??
            setCourseName('');
            setDescription('');
            navigate(`/`);
            }}>Submit</Button>
    </>;
}