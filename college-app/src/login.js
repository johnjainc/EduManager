import { useState } from "react";
import { useHistory } from "react-router-dom";
import {IDContext} from "./App"
import { useContext } from "react";
import myImage from './login.jpeg';
import './styles/login.css';
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
    
    <div className="container">
      
      <form className="form "onSubmit={handleSubmit}>
      <h2>SIGN IN</h2>
        
        <input 
          className="box"
          type="text" 
          required 
          value={id}
          placeholder="Enter id"
          onChange={(e) => setID(e.target.value)}
        />
        
        <input 
          className="box"
          type="password" 
          required 
          value={password}
          placeholder="Enter password"
          onChange={(e) => setpassword(e.target.value)}
        />
        
        
        <button id="submit">Login</button>
      </form>
      <div className="side">
      <img src={myImage} alt=""/>
    </div>
      <p>{status}</p>
    </div>
    
  );
}
 
export default Login;