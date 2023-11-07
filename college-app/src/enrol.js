import { useState } from "react";
import AdminNavbar from "./adminnav";

const Enrol = () => {
    const [enrol,setenrol]=useState({sem:'',batch:'',crscode:'',tcrid:''});
    const [courseList,setcourses]=useState([]);
    const [st,setst]=useState();
    const [st2,setst2]=useState();
    const[teacher,setTeacher]=useState('');
    const [teacherList,setteachers]=useState([]);
    const [colour,setColour]=useState([]);
    
    const EnrolClass=()=>
    {
    
    fetch('http://localhost:8000/api/enrol', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrol)
    }).then(() => {console.log("added");

      
      
      
      
    })
    .catch(err=>
    {
      console.log(err);
      
    })
  
    }
    const searchTeachers=()=>
    {
      fetch("http://localhost:8000/api/searchTeacher/"+teacher)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
            console.log(data);
            setteachers(data);
            setst2(1);
            setColour(Array(teacherList.length).fill('blue'));
            
      })
      .catch(err=>
        {
            console.log(err);
        })
    }
    const searchCourse=()=>
    {
        
        
        fetch("http://localhost:8000/api/searchCourseBySem/"+enrol.sem)
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
                setcourses(data);
                setenrol({...enrol,crscode:data[0].code})
                setst(1);
                
          })
          .catch(err=>
            {
                console.log(err);
            })
    }
    return ( 
        
            <div> 
              <AdminNavbar/> 
              <h1>Enrol Batch for a course</h1>
            <label>semester:</label>
            <input
            type="text"
            required
            value={enrol.sem}
            placeholder="1-8"
            onChange={(e) => {setenrol({...enrol,sem:e.target.value});setst(null);}}
            />
            <button onClick={searchCourse}>search courses</button>
            <br></br>
            {st &&<div><label>Select from Available Courses:  </label>
            <select
            value={enrol.crscode}
            onChange={(e)=>setenrol({...enrol,crscode:e.target.value})}
            required
            >
                {courseList.map(courses => (
                <option value={courses.code}>{courses.name}</option>
            ))}
            </select>
            </div>}


            <br/>
            <label>Batch:</label>
            <input
            
            type="text"
            value={enrol.batch}
            required
            placeholder="1/2"
            onChange={(e)=>setenrol({...enrol,batch:e.target.value})}
            />
            <br/>
            <label>Name of teacher:</label>
            <input
            type="text"
            required
            value={teacher}
            onChange={(e)=>{setTeacher(e.target.value);setst2(null)}}
            />
            <button onClick={searchTeachers}>Search Teachers</button>
            {st2&&
            <div>
              <p style={{marginBlock:0}}>Select Teacher</p>
              <ul style={{listStyleType:'none',marginLeft:5,marginBlock:0,padding:0}}>
                  {teacherList.map((teacher,index) => 
                <li style={{color:colour[index],cursor:"pointer"}}
                onClick={()=>{
                
                setenrol({...enrol,tcrid:teacher.id});
                setColour({[index]:'blue'});
                console.log(enrol.tcrid);
              }}
                
                >{teacher.id} : {teacher.name}</li>
                
            )}
              </ul>
              
              </div>
              
            }
            <br/>
            <button onClick={EnrolClass}>Enrol </button>
           
            
            
            
            </div>
        
            
        
     );
}
 
export default Enrol;