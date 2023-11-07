import useFetch from './useFetch';

import {useEffect,useState}  from 'react';
var students=[];var phrs=[];
const UpdateAttendance = (values) => {
    const[st,setst]=useState(null);
    useEffect(()=>
    {
        students=[];phrs=[];
    },[values.option])
    
    console.log(values.enrol_id);
    const { data,setData, error, isPending } = useFetch('http://localhost:8000/api/teacher/student_course/' + values.enrol_id);
    const submit=()=>
    {
        fetch('http://localhost:8000/api/teacher/updateattendance', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({students:students,phrs:phrs,enrolid:values.enrol_id})
            })
            .then(() => {
            
                students=[];phrs=[];
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
    const mark=(e,stid,index)=>
        {   
            
            let newData = [...data];
             newData[index] = {
              ...newData[index],
              present_hrs:e.target.value  
            };
            setData(newData);
            if(e.target.value!='')
                {let hrs=parseInt(e.target.value)
                if(!students.includes(stid)){ students.push(stid);phrs.push(hrs)}
                else {index=students.indexOf(stid);
                    phrs[index]=hrs;

                }console.log(students,phrs);
                }
        }
    return (
        <ul>
         {st&&<p>Updated</p>}
        {data&&data.map((student,index) => (
          <li key={student.st_id}>
            <label>{student.st_id}{" "}{student.name}{" present hrs: "}
              <input
                type="text"
                
                value={data[index].present_hrs}
                
                onChange={(e)=>{mark(e,student.st_id,index)}}
                
              />
              {" total hrs: "}{student.total_hrs}{" perc: "}
              {Math.round(student.present_hrs/student.total_hrs*100)}{"%"}
              
            </label>
          </li>
        ))}
        <button onClick={submit}>Update</button>
      </ul>
      );
}
 
export default UpdateAttendance;