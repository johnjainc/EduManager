import {IDContext} from "./App"
import { useContext } from "react";
import { Link } from 'react-router-dom';
import useFetch from "./useFetch";
import StudentNavbar from "./studentnav";
const Student = () => {
    const { UserID, setUserID }=useContext(IDContext);
    const { data: courses, error, isPending } = useFetch('http://localhost:8000/api/student/courses/' + UserID);
    return ( 
        
        <div >
        <StudentNavbar/>
        <h1 className="text-3xl font-bold underline">Student Dashboard</h1>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { courses && <div>
        {courses.map(course => (
        <div className="course-preview" key={course.enrol_id} >
          <Link to={`/student/courses/${course.enrol_id}`}>
            <h2>{ course.course_code }</h2>
            
          </Link>
        </div>
      ))}
      </div> }
    </div>
       
        
     );
}
 
export default Student;