import {IDContext} from "./App"
import { useContext } from "react";

import useFetch from "./useFetch";
const ViewMarks = (values) => {
    const { UserID, setUserID }=useContext(IDContext);
    const { data, error, isPending } = useFetch(`http://localhost:8000/api/student/course?enrolid=${values.enrolid}&stid=${UserID}`);
    return ( <div>
        {data&&<p>marks:{data[0].marks}</p>}
    </div> );
}
 
export default ViewMarks;