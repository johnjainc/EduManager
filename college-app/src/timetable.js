import React, { useState } from 'react';
/*to do-
 find mechanism display in the format
in initialTimetableData construct such tat each time slot has entryi= if non subject set ita as --.
on click check if entry is -- => add to entry to be inserted to tt table
else add to to-modify set to be updated to tt(if entry already in to-insert dont add to this category)(both case update initialTimetableData to update ui)
join enrol and tt to get batchwise data and course code(also for update and insert)
*/
const Timetable = () => {
  // Sample data (replace with your actual data)
  const initialTimetableData = [
    { class: 'A', day: 1, hour: 1, subjectname: 'Math' },
    { class: 'A', day: 1, hour: 2, subjectname: 'English' },
    { class: 'A', day: 1, hour: 3, subjectname: 'Eng'},
    { class: 'A', day: 1, hour: 4, subjectname: 'Eh' },
    { class: 'A', day: 1, hour: 5, subjectname: 'Englh' },
    { class: 'A', day: 2, hour: 1, subjectname: 'Math' },
    { class: 'A', day: 2, hour: 2, subjectname: 'English' },
    { class: 'A', day: 2, hour: 3, subjectname: 'Eng'},
    { class: 'A', day: 2, hour: 4, subjectname: 'Eh' },
    { class: 'A', day: 2, hour: 5, subjectname: 'Englh' }
    // ... other timetable entries
  ];
  let tt=[[],[]];
  for(let i=0;i<10;i++)
  {
    tt[Math.floor(i/5)].push(<td>{initialTimetableData[i].subjectname}</td>)
  }

  const [timetable, setTimetable] = useState(initialTimetableData);
  const [editedSubject, setEditedSubject] = useState({});

  

  return (
    <div>
      <h2>Class Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Hour1</th>
            <th>Hour2</th>
            <th>Hour3</th>
            <th>Hour4</th>
            <th>Hour5</th>
          </tr>
        </thead>
        <tbody>
          {tt.map((ttd)=>(
            <tr>
              {ttd}
            </tr>
          ))}
          
        </tbody>
      </table>
                
    </div>
  );
};

export default Timetable;
