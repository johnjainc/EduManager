import { useState } from "react";
import { useHistory } from "react-router-dom";
import {IDContext} from "./App"
import { useContext } from "react";
const Login = () => {
  const [id, setID] = useState();
  const [status, setstatus] = useState('');
  const [password, setpassword] = useState('');
  const { UserID, setUserID }=useContext(IDContext);


  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const abortCont = new AbortController();
    fetch("http://localhost:8000/api/"+id, { signal: abortCont.signal 
})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        if(!data.length){setstatus("Invalid ID")}
        data=data[0];
        if (data.password===password)
        {
          setUserID(data.id);
          if(data.type==='admin') history.push('/admin');
          else if(data.type==='teacher') history.push('/teacher');
          else history.push('/student');
        }
        else {console.log("login fail");setstatus("Invalid Password");}

        console.log(data);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else
        {console.log(err);}
      })
  }
  return (
    <div >
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <label>id:</label>
        <input 
          type="text" 
          required 
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <label>password:</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        
        
        <button>Login</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
 
export default Login;