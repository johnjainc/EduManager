// import React, { useEffect, useState } from 'react';
// import useFetch from './useFetch';



// let initialTimetableData;let timetablevalues=[];
// const Timetable = (values) => {
  
//   const sem=values.sem;const batch=values.batch;
//   const[edited,setedited]=useState(null);
//   const[day,setday]=useState(null);
//   const[hour,sethour]=useState(null);

   
    

//     const { data:initialTimetableData,setData:settt, error, isPending } = useFetch(`http://localhost:8000/api/timetable/student?sem=${sem}&batch=${batch}`);
//     const {data:courses}=useFetch("http://localhost:8000/api/searchCourseBySem/"+sem)
//   const handleChange=(e,index,hour)=>
  
//     {let tt=initialTimetableData;
//       switch (hour) {
//       case 1:
//         tt[index].hour1=e.target.value;
//         break;
//       case 2:
//           tt[index].hour2=e.target.value;
//           break;
//       case 3:
//           tt[index].hour3=e.target.value;
//           break;
//       case 4:
//           tt[index].hour4=e.target.value;
//           break;
//       case 5:
//           tt[index].hour5=e.target.value;
//           break;
//       case 5:
//       tt[index].hour6=e.target.value;
//       break;       
    
//       default:
//         break;
//     }
      
//       console.log(initialTimetableData);settt(tt);
//       setedited(e.target.value);
    
//     }
  
//   const save=()=>
//   {const transformedData = initialTimetableData.flatMap(entry => {
//     const { day, ...hours } = entry;
//     return Object.entries(hours).map(([hour, subjectname]) => ({
//       day,
//       hour: parseInt(hour.slice(-1)), // Extract the numeric part from "hourX"
//       subjectname
//     }));
//   });
//   setday(null);
//   sethour(null);
//   console.log(transformedData);
//   fetch('http://localhost:8000/api/timetable/student', {
//       method: 'POST',
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({timetable:transformedData,batch:batch,sem:sem})
//       })
//       .then(() => {
      
      

//       })
//       .catch(err=>
//       {
//           console.log(err);
          
//       })
//   }
  
  
  
  
  

  

//   return (
//     <div>
//       <h2>Class Timetable</h2>
//       {initialTimetableData&&<table>
//         <thead>
//           <tr>
//             <th>Hour1</th>
//             <th>Hour2</th>
//             <th>Hour3</th>
//             <th>Hour4</th>
//             <th>Hour5</th>
//             <th>Hour6</th>
//           </tr>
//         </thead>
//         <tbody>
//           {initialTimetableData.map((value,index)=>
//           {
//             return(<tr>
//               <td onClick={()=>{setday(index);sethour(1);setedited(initialTimetableData[index].hour1)}}>{day===index&&hour===1?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,1)}}></input>):(value.hour1 )}</td>
//               <td onClick={()=>{setday(index);sethour(2);setedited(initialTimetableData[index].hour2)}}>{day===index&&hour===2?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,2)}}></input>):(value.hour2)}</td>
//               <td onClick={()=>{setday(index);sethour(3);setedited(initialTimetableData[index].hour3)}}>{day===index&&hour===3?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,3)}}></input>):(value.hour3)}</td>
//               <td onClick={()=>{setday(index);sethour(4);setedited(initialTimetableData[index].hour4)}}>{day===index&&hour===4?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,4)}}></input>):(value.hour4)}</td>
//               <td onClick={()=>{setday(index);sethour(5);setedited(initialTimetableData[index].hour5)}}>{day===index&&hour===5?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,5)}}></input>):(value.hour5)}</td>
//               <td onClick={()=>{setday(index);sethour(6);setedited(initialTimetableData[index].hour6)}}>{day===index&&hour===6?(<input type='text' value={edited} onChange={(e)=>{handleChange(e,index,6)}}></input>):(value.hour6)}</td>
              
//             </tr>)
//           }
          
            
            
//           )}
          
//         </tbody>

//       </table>}
//       <button onClick={save}>save changes</button>
//       {courses&&<ul>
//       {courses.map((course)=>
//       (
//         <li>
//           {course.code}:{course.name}
//         </li>
//       ))}
//       </ul>
//       }
        
                
//     </div>
//   );
// };

// export default Timetable;
import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';

let initialTimetableData;
let timetablevalues = [];
const Timetable = (values) => {
  const sem = values.sem;
  const batch = values.batch;
  const [edited, setedited] = useState(null);
  const [day, setday] = useState(null);
  const [hour, sethour] = useState(null);

  const { data: initialTimetableData, setData: settt, error, isPending } = useFetch(
    `http://localhost:8000/api/timetable/student?sem=${sem}&batch=${batch}`
  );
  const { data: courses } = useFetch('http://localhost:8000/api/searchCourseBySem/' + sem);

  const handleChange = (e, index, hour) => {
    let tt = initialTimetableData;
    switch (hour) {
      case 1:
        tt[index].hour1 = e.target.value;
        break;
      case 2:
        tt[index].hour2 = e.target.value;
        break;
      case 3:
        tt[index].hour3 = e.target.value;
        break;
      case 4:
        tt[index].hour4 = e.target.value;
        break;
      case 5:
        tt[index].hour5 = e.target.value;
        break;
      case 6:
        tt[index].hour6 = e.target.value;
        break;

      default:
        break;
    }

    console.log(initialTimetableData);
    settt(tt);
    setedited(e.target.value);
  };

  const save = () => {
    const transformedData = initialTimetableData.flatMap((entry) => {
      const { day, ...hours } = entry;
      return Object.entries(hours).map(([hour, subjectname]) => ({
        day,
        hour: parseInt(hour.slice(-1)), // Extract the numeric part from "hourX"
        subjectname,
      }));
    });
    setday(null);
    sethour(null);
    console.log(transformedData);
    fetch('http://localhost:8000/api/timetable/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timetable: transformedData, batch: batch, sem: sem }),
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333' }}>Class Timetable</h2>
      {initialTimetableData && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Hour1</th>
              <th style={tableHeaderStyle}>Hour2</th>
              <th style={tableHeaderStyle}>Hour3</th>
              <th style={tableHeaderStyle}>Hour4</th>
              <th style={tableHeaderStyle}>Hour5</th>
              <th style={tableHeaderStyle}>Hour6</th>
            </tr>
          </thead>
          <tbody>
            {initialTimetableData.map((value, index) => (
              <tr key={index} style={tableRowStyle}>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(1);
                    setedited(initialTimetableData[index].hour1);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 1 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 1);
                      }}
                    />
                  ) : (
                    value.hour1
                  )}
                </td>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(2);
                    setedited(initialTimetableData[index].hour2);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 2 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 2);
                      }}
                    />
                  ) : (
                    value.hour2
                  )}
                </td>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(3);
                    setedited(initialTimetableData[index].hour3);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 3 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 3);
                      }}
                    />
                  ) : (
                    value.hour3
                  )}
                </td>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(4);
                    setedited(initialTimetableData[index].hour4);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 4 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 4);
                      }}
                    />
                  ) : (
                    value.hour4
                  )}
                </td>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(5);
                    setedited(initialTimetableData[index].hour5);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 5 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 5);
                      }}
                    />
                  ) : (
                    value.hour5
                  )}
                </td>
                <td
                  onClick={() => {
                    setday(index);
                    sethour(6);
                    setedited(initialTimetableData[index].hour6);
                  }}
                  style={tableCellStyle}
                >
                  {day === index && hour === 6 ? (
                    <input
                      type="text"
                      value={edited}
                      onChange={(e) => {
                        handleChange(e, index, 6);
                      }}
                    />
                  ) : (
                    value.hour6
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button style={buttonStyle} onClick={save}>
        Save Changes
      </button>
      {courses && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          {courses.map((course) => (
            <li key={course.code} style={listItemStyle}>
              {course.code}:{course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const listItemStyle = {
  marginBottom: '8px',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

export default Timetable;
