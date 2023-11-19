import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import TeacherNavbar from "./teachernav";
import MarkAttendance from "./markattendance";
import UpdateMarks from "./updatemarks";
import UpdateAttendance from "./updateattendance";
const Course = () => {
    const { enrol_id } = useParams();
    const [option, setoption] = useState(0);
    
    console.log("course");
    const mark_attendance=()=>{setoption(1)}
    const update_marks=()=>{setoption(2)}
    const update_attendance=()=>{setoption(3)}
    return ( 
        
        <div>
            <TeacherNavbar/>
            
            <button onClick={mark_attendance}>mark attendance</button>
            <button onClick={update_marks}>update marks</button>
            <button onClick={update_attendance}>update attendance</button>
            {option==1 && <MarkAttendance enrol_id={enrol_id} option={option}/>}
            {option==2 && <UpdateMarks enrol_id={enrol_id}/>}
            {option==3 && <UpdateAttendance enrol_id={enrol_id}/>}
        </div>

     );
}
 
export default Course;