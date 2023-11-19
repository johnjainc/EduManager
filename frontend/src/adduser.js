import AdminNavbar from "./adminnav";
import { useState  } from "react";
const Adduser = () => {
    
    const [id, setid] = useState();
    const [type, settype] = useState('student');
    const [batch, setbatch] = useState('null');
    const [sem, setsem] = useState('null');
    const [name, setname] = useState();
    const [st, setst] = useState(); 
    const [err, seterr] = useState(); 
   


    const handleSubmit=(e)=>
    {   seterr(null);
        e.preventDefault();

        
        fetch("http://localhost:8000/api/"+id)
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            } 
            return res.json();
          })
          .then(data => {
            if (data.length==0){
                let data={id:id,name:name,batch:batch,type:type,sem:sem};
                fetch('http://localhost:8000/api/add', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
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
          <h1>Add User</h1>
        {err&&<div> id already exists</div>}
        {st&&<div>added succesfully</div>}
        <form onSubmit={handleSubmit}>
        <label>id:</label>
        <input 
          type="text" 
          required 
          value={id}
          onChange={(e) => setid(e.target.value)}
        />
        <label>name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label>type:</label>
        <select
          value={type}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="student">student</option>
          <option value="teacher">teacher</option>
          <option value="admin">admin</option>
        </select>
        {type==='student'&&<>
        <label>batch:</label><input
            type="text"

            onChange={(e) => setbatch(e.target.value)} />
            <label>sem:</label><input
            type="text"

            onChange={(e) => setsem(e.target.value)} />
            </>}
        
        
        <button>Add</button>
      </form>
        </div>
     );
}
 
export default Adduser;