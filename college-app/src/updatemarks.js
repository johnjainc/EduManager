import useFetch from './useFetch';
import {useEffect,useState}  from 'react';
var students=[];var upmarks=[];
const UpdateMarks = (values) => {
    const[st,setst]=useState(null);
    useEffect(()=>
    {
        students=[];upmarks=[];
    },[values.option])
    console.log(values.enrol_id);
    const { data,setData, error, isPending } = useFetch('http://localhost:8000/api/teacher/student_course/' + values.enrol_id);
    const submit=()=>
    {
        fetch('http://localhost:8000/api/teacher/updatemarks', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({students:students,marks:upmarks,enrolid:values.enrol_id})
            })
            .then(() => {
           students=[];upmarks=[];
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
              marks:e.target.value  
            };
            setData(newData);
            if(e.target.value!='')
                {let marks=parseInt(e.target.value)
                if(!students.includes(stid)){ students.push(stid);upmarks.push(marks)}
                else {index=students.indexOf(stid);
                    upmarks[index]=marks;

                }console.log(students,upmarks);
                }
        }
    return (
        <ul>
        {st&&<p>Updated</p>}
        {data&&data.map((student,index) => (
          <li key={student.st_id}>
            <label>{student.st_id}{" "}{student.name}
              <input
                type="text"
                
                value={data[index].marks}
                
                onChange={(e)=>{mark(e,student.st_id,index)}}
                
              />
              
            </label>
          </li>
        ))}
        <button onClick={submit}>Update</button>
      </ul>
      );
}
 
export default UpdateMarks;