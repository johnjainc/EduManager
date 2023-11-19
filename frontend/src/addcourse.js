import AdminNavbar from "./adminnav";
import { useState  } from "react";
const Addcourse = () => {
    
    const [course,setcourse]=useState({code:'',credits:'',name:'',semester:''});
    const [st, setst] = useState(); 
    const [err, seterr] = useState(); 
   


    const handleSubmit=(e)=>
    {   seterr(null);
        e.preventDefault();
        setcourse({...course,code:''})

        
        fetch("http://localhost:8000/api/course/"+course.code)
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
            if (data.length==0){
                
                fetch('http://localhost:8000/api/course/add', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(course)
                        })
                        .then(() => {
                        setst(true);
                        setTimeout(() => {
                            setst(null);
                        }, 1000);
        
                        })
                        .catch(err=>
                        {
                            console.log(err);
                            
                        })
            }
            else seterr(1);
            
          })
          .catch(err=>
            {
                console.log(err);
                
            })
        //   
          
        
          
    }
    
    return ( 

        <div>
            <AdminNavbar/>
        {err&&<div> course already exists</div>}
        {st&&<div>added succesfully</div>}
        <form onSubmit={handleSubmit}>
        <label>course code:</label>
        <input 
          type="text" 
          required 
          placeholder="format: AAA 000"
          value={course.code}
          onChange={(e) => setcourse({...course,code:e.target.value})}
        />
        <label>course name:</label>
        <input 
          type="text" 
          required 
          value={course.name}
          onChange={(e) => setcourse({...course,name:e.target.value})}
        />
        <label>credits:</label>
        <input
        type="text"
          value={course.type}
          required
          onChange={(e) => setcourse({...course,credits:e.target.value})}
        />
          
        
        <label>semester:</label>
        <input 
          type="text" 
          value={course.semester}
          onChange={(e) => setcourse({...course,semester:e.target.value})}
        />
        
        
        <button>Add</button>
      </form>
        </div>
     );
}
 
export default Addcourse;