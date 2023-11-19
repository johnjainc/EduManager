// import { useState } from "react";
// import AdminNavbar from "./adminnav";

// import Timetable from "./timetable";

// const TimetableActions = () => {
//     let s,b;
//     const[sem,setsem]=useState(1);
//     const[batch,setbatch]=useState(1);
//     const[argsem,setargsem]=useState();
//   const[argbatch,setargbatch]=useState();
//     const[tt,settt]=useState(null);
//     // const { UserID, setUserID }=useContext(DataContext);
//     return ( <div>
//         <AdminNavbar/>
//         <label>semester:</label>
//         <select
//         value={sem}
//         onChange={(e)=>{setsem(e.target.value)}}>
//             <option value={1}>1</option>
//             <option value={2}>2</option>
//         </select>
//         <label>batch:</label>
//         <select
//         value={batch}
//         onChange={(e)=>{setbatch(e.target.value)}}>
            
//             <option value={1}>1</option>
//             <option value={2}>2</option>
//         </select>
//         <button onClick={()=>{settt(true);setargbatch(batch);setargsem(sem);}}>Show Timetable</button>
//         {tt&&
        
//             <Timetable sem={argsem} batch={argbatch}/>
//         }
//     </div> );
// }
 
// export default TimetableActions;
import { useState } from 'react';
import AdminNavbar from './adminnav';
import Timetable from './timetable';

const TimetableActions = () => {
  let s, b;
  const [sem, setsem] = useState(1);
  const [batch, setbatch] = useState(1);
  const [argsem, setargsem] = useState();
  const [argbatch, setargbatch] = useState();
  const [tt, settt] = useState(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <AdminNavbar />
      <label style={labelStyle}>Semester:</label>
      <select
        value={sem}
        onChange={(e) => {
          setsem(e.target.value);
        }}
        style={selectStyle}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <label style={labelStyle}>Batch:</label>
      <select
        value={batch}
        onChange={(e) => {
          setbatch(e.target.value);
        }}
        style={selectStyle}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <button
        onClick={() => {
          settt(true);
          setargbatch(batch);
          setargsem(sem);
        }}
        style={buttonStyle}
      >
        Show Timetable
      </button>
      {tt && <Timetable sem={argsem} batch={argbatch} />}
    </div>
  );
};

const labelStyle = {
  marginRight: '10px',
};

const selectStyle = {
  marginRight: '20px',
  padding: '8px',
  borderRadius: '4px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default TimetableActions;
