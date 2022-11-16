import { currentUser } from "../../api/loginApi";

export const CourseList = ({justMine}) => {
    const sample = [
        {name: "Data Structures", number: 2341, sectionID: 1, professorID: 1},
        {name: "Discrete Computational Structures", number: 2353, sectionID: 1, professorID: 2},
        {name: "Discrete Computational Structures", number: 2353, sectionID: 2, professorID: 3},
        {name: "Graphical User Interfaces", number: 3345, sectionID: 1, professorID: 4},
        {name: "Fundamentals of Algorithms", number: 3353, sectionID: 1, professorID: 1}
    ];

    if (justMine === true) {
        
    }

    if (justMine === true) {
        return <>
            <ul className="list-unstyled px-0 mx-0">
                {
                    sample.map((course, index) => {
                        return (<li key={index} className="list-group-item mb-3">
                            <ul className="list-group px-0">
                                <li className="list-group-item bg-secondary">
                                    <div className="row">
                                        <span className="">CS {course.number} <span className="float-end">{course.name}</span></span>
                                    </div>
                                </li>
                                <li className="list-group-item  bg-light">
                                    <div className="row py-2">
                                        <div className="col-6 text-muted">
                                            <span>Section: 00{course.sectionID}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>)}
                    )
                }
            </ul>
        </>;
    } else {
        return <>
            <ul className="list-unstyled px-0 mx-0">
                {
                    sample.map((course, index) => {
                        return (<li key={index} className="list-group-item mb-3">
                            <ul className="list-group px-0">
                                <li className="list-group-item bg-secondary">
                                    <div className="row">
                                        <span className="">CS {course.number} <span className="float-end">{course.name}</span></span>
                                    </div>
                                </li>
                                <li className="list-group-item  bg-light">
                                    <div className="row py-2">
                                        <div className="col-6 text-muted">
                                            <span>Section: 00{course.sectionID}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>)}
                    )
                }
            </ul>
        </>;
    }
};