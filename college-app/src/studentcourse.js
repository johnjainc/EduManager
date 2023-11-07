import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { useContext,useState } from "react";

import ViewAttendance from "./viewattendance";
import ViewMarks from "./viewmarks";
const StudentCourse = () => {
    
    const {enrol_id}=useParams();
    
    
    const [option, setoption] = useState(0);
    
    console.log("course");
    const view_attendance=()=>{setoption(1)}
    const view_marks=()=>{setoption(2)}
    
    return ( 
        
        <div>
            
            
            
            <button onClick={view_marks}>view marks</button>
            <button onClick={view_attendance}>view attendance</button>
            {option==1 && <ViewAttendance enrolid={enrol_id}/>}
            {option==2 && <ViewMarks enrolid={enrol_id}/>}
            
        </div>

     );
}
 
export default StudentCourse;