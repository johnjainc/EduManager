
import { useState } from 'react';
import useFetch from './useFetch';
const MarkAttendance = (values) => {
  const { data, error, isPending } = useFetch('http://localhost:8000/api/teacher/student_course/' + values.enrol_id);
  const [st,setst]=useState(null);
  var absentees=[];
  console.log(values.enrol_id);
  const mark=(stid)=>
  {
    console.log(stid);
    if(absentees.includes(stid)) absentees=absentees.filter(item => item !== stid);
    else absentees.push(stid);
    console.log(absentees);
  }
  const submitattendance=()=>
  {
    fetch('http://localhost:8000/api/teacher/markattendance', {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({absentees:absentees,enrolid:values.enrol_id})
                        })
                        .then(() => {
                            setst(1);
                            setTimeout(()=>
                            {
                             setst(null);
                            },5000)
                       
        
                        })
                        .catch(err=>
                        {
                            console.log(err);
                            
                        })
  }
  

  return (
    <div>
      <h2>Mark Absentees of the Period</h2>
      {st&&<p>Updated</p>}
      {data &&
      <ul>
        {data.map(student => (
          <li key={student.st_id}>
            <label>
              <input
                type="checkbox"
                
                onChange={()=>{mark(student.st_id)}}
                
              />
              {student.st_id}{" "}{student.name}
            </label>
          </li>
        ))}
        <button onClick={submitattendance}>submit attendance</button>
      </ul>
      
      }
    </div>
  );
};

export default MarkAttendance;
//make an array wuht absentees student id