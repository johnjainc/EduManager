import {IDContext} from "./App"
import { useContext } from "react";

import useFetch from "./useFetch";
const ViewAttendance = (values) => {
    console.log(values.enrolid);
    const { UserID, setUserID }=useContext(IDContext);
    const { data, error, isPending } = useFetch(`http://localhost:8000/api/student/course?enrolid=${values.enrolid}&stid=${UserID}`);
    return ( <>{data&&<div>
        <p>present hrs:{data[0].present_hrs}</p> 
        <p>total hrs:{data[0].total_hrs}</p> 
        <p>perc:{Math.round(data[0].present_hrs/data[0].total_hrs*100)}%</p> 
    </div>}</>
    );
}
 
export default ViewAttendance;