import {IDContext} from "./App"
import { useContext } from "react";
import { Link } from 'react-router-dom';
import useFetch from "./useFetch";
import TeacherNavbar from "./teachernav";
const Teacher = () => {
    const { UserID, setUserID }=useContext(IDContext);
    const { data: courses, error, isPending } = useFetch('http://localhost:8000/api/teacher/courses/' + UserID);
    return ( 
        
        <div >
        <TeacherNavbar/>
        <h1 className="text-3xl font-bold underline">Teacher Dashboard</h1>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { courses && <div>
        {courses.map(course => (
        <div className="course-preview" key={course.enrol_id} >
          <Link to={`/teacher/courses/${course.enrol_id}`}>
            <h2>{ course.course_code }</h2>
            <p mt-6 text-lg leading-8 text-gray-300>Sem:{ course.semester } Batch: { course.batch }</p>
          </Link>
        </div>
      ))}
      </div> }
    </div>
       
        
     );
}
 
export default Teacher;