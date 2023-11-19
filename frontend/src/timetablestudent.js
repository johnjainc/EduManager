// import useFetch from './useFetch';
// import {IDContext} from "./App"
// import { useContext } from "react";
// const TimetableStudent = () => {
//     const { sem,batch }=useContext(IDContext);

//     console.log(sem,batch);
//     const { data: initialTimetableData, setData: settt, error, isPending } = useFetch(`http://localhost:8000/api/timetable/student?sem=${sem}&batch=${batch}`);
//     const { data: courses } = useFetch("http://localhost:8000/api/searchCourseBySem/" + sem)
//     return (
//         <div>
//             <h2>Class Timetable{sem}</h2>
//             {initialTimetableData && <table>
//                 <thead>
//                     <tr>
//                         <th>Hour1</th>
//                         <th>Hour2</th>
//                         <th>Hour3</th>
//                         <th>Hour4</th>
//                         <th>Hour5</th>
//                         <th>Hour6</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {initialTimetableData.map((value, index) => {
//                         return (<tr>
//                             <td >{value.hour1}</td>
//                             <td >{value.hour2}</td>
//                             <td >{value.hour3}</td>
//                             <td >{value.hour4}</td>
//                             <td >{value.hour5}</td>
//                             <td >{value.hour6}</td>

//                         </tr>)
//                     }
//                     )}

//                 </tbody>

//             </table>}

//             {courses && <ul>
//                 {courses.map((course) =>
//                 (
//                     <li>
//                         {course.code}:{course.name}
//                     </li>
//                 ))}
//             </ul>
//             }


//         </div>
//     );
// };

// export default TimetableStudent;
import useFetch from './useFetch';
import { IDContext } from './App';
import { useContext } from 'react';

const TimetableStudent = () => {
  const { sem, batch } = useContext(IDContext);

  console.log(sem, batch);
  const {
    data: initialTimetableData,
    setData: settt,
    error,
    isPending,
  } = useFetch(
    `http://localhost:8000/api/timetable/student?sem=${sem}&batch=${batch}`
  );
  const { data: courses } = useFetch(
    'http://localhost:8000/api/searchCourseBySem/' + sem
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333' }}>Class Timetable {sem}</h2>
      {initialTimetableData && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                <td style={tableCellStyle}>{value.hour1}</td>
                <td style={tableCellStyle}>{value.hour2}</td>
                <td style={tableCellStyle}>{value.hour3}</td>
                <td style={tableCellStyle}>{value.hour4}</td>
                <td style={tableCellStyle}>{value.hour5}</td>
                <td style={tableCellStyle}>{value.hour6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {courses && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
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

// Define your styles outside the component for better organization
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

const listItemStyle = {
  marginBottom: '8px',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

export default TimetableStudent;
