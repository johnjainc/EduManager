    const pool=require('../db');
    const queries=require('./queries');
    const getStudents=(req,res)=>
    {    pool.query(queries.getStudents,((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
    };
    const getStudentsByID=(req,res)=>
    
    {    const id=parseInt(req.params.id);
        
        pool.query(queries.getStudentsByID,[id],((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
    };
    const getcourse=(req,res)=>
    
    {    const id=req.params.id;
        
        pool.query(queries.getcourse,[id],((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
    };
    const searchCourseBySem=(req,res)=>
    
    {    const sem=req.params.sem;
        console.log("searchCourseBySem");
        pool.query(queries.searchCourseBySem,[sem],((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
    };
    const addStudent=(req,res)=>
    {   
        const {id,name,batch,type,sem} = req.body;
        
        
        if(batch=='null')
        { 
            pool.query(queries.addStudentnb,[id,name,type],(error,results)=>
            {
                if(error) throw error;
                res.status(201).send("added");
                
            });}
            else
            pool.query(queries.addStudent,[id,name,batch,type,sem],(error,results)=>
            {
                if(error) throw error;
                res.status(201).send("added");
                
            });
            
        };
        const addcourse=(req,res)=>
        {   
            const {code,name,credits,semester} = req.body;
            console.log(req.body);
            
            
            pool.query(queries.addcourse,[code,name,credits,semester],(error,results)=>
            {
                if(error) throw error;
                res.status(201).send("added");
                
            });
            
        };
        const deleteStudent=(req,res)=>
        {
            const {id}=req.body;
            pool.query(queries.getStudentsByID,[id],(error,results)=>
            {
                const notfound=!results.rows.length;
                if(notfound)
                {
                    res.send("not found");
                    
                }
                pool.query(queries.deleteStudent,[id],(error,result)=>
                {
                    if(error) throw error;
                    res.status(200).send("removed");
                })
            })
        }
        
        const searchTeacher=(req,res)=>
        {
            const teacher=req.params.teacher;
            pool.query(queries.getTeacher,[`%${teacher}%`],((error,results)=>
            {
                if(error) throw error;
                res.status(200).json(results.rows);
                
                
            }))
        }
        const enrolBatch=(req,res)=>
        {
            
            const {sem,batch,crscode,tcrid} = req.body;
            console.log("enrolBatch");
            pool.query(queries.addToEnrol,[crscode,batch,tcrid,sem],(err,results)=>
            {
                if(err) throw err;
                res.status(201).send("enrolled");
            })
        }
        
        
        // const changeName=(req,res)=>
        // {
        //     const {name}=req.body;
        //     const id=parseInt(req.params.id);
        //     pool.query(queries.getStudentsByID,[id],(error,results)=>
        //     {
        //         const notfound=!results.rows.length;
        //         if(notfound)
        //         {
        //             res.send("not found");
        
        //         }
        //         pool.query(queries.changeName,[name,id],(error,result)=>
        //         {
        //             if(error) throw error;
        //             res.status(200).send("changed");
        //         })
        //     })
        // }
        const change=(req,res)=>
        {
            const {name,id,batch}=req.body;
            
            pool.query(queries.getStudentsByID,[id],(error,results)=>
            {
                const notfound=!results.rows.length;
                if(notfound)
                {
                    res.send("not found");
                    
                }
                pool.query(queries.change,[name,batch,id],(error,result)=>
                {
                    if(error) throw error;
                    res.status(200).send("changed");
                })
            })
        }
        const teacherCourses=(req,res)=>
        {
            const teacher=req.params.id;
            console.log("teachercourses");
            pool.query(queries.getTeacherCourses,[teacher],((error,results)=>
            {
                if(error) throw error;
                res.status(200).json(results.rows);
                
                
            }))
            
            
            
        }
        const markAttendance=(req,res)=>
        {
            const {absentees,enrolid}=req.body;
            console.log(absentees);
            console.log(enrolid);
            const absenteeList=absentees.join(', ');
            console.log(absenteeList);
            const query=absentees.length!=0?`UPDATE student_course SET present_hrs = CASE WHEN st_id NOT IN (${absenteeList}) THEN present_hrs + 1 ELSE present_hrs END, total_hrs = total_hrs+1 where enrol_id=${enrolid}`: 
            `update student_course SET present_hrs = present_hrs + 1,total_hrs=total_hrs+1 where enrol_id=${enrolid}`;
            
            
            pool.query(query,(error,result)=>
            {
                if(error) throw error;
                res.status(200).send("marked");
            })
            
        }
        
        const updateMarks=(req,res)=>
        {
            const {students,marks,enrolid}=req.body;
            let query = 'UPDATE student_course SET marks = CASE ';
            for (let i = 0; i < students.length; i++) {
                query += `WHEN st_id = '${students[i]}' THEN ${marks[i]} `;
            }
            query += 'ELSE marks END WHERE st_id IN (' + students.map(id => `'${id}'`).join(', ') + ') and enrol_id='+enrolid;
            console.log(query);
            pool.query(query,(error,result)=>
            {
                if(error) throw error;
                res.status(200).send("updated");
            })
            
        }
        const updateAttendace=(req,res)=>
        {const {students,phrs,enrolid}=req.body;
        let query = 'UPDATE student_course SET present_hrs = CASE ';
        for (let i = 0; i < students.length; i++) {
            query += `WHEN st_id = '${students[i]}' THEN ${phrs[i]} `;
        }
        query += 'ELSE present_hrs END WHERE st_id IN (' + students.map(id => `'${id}'`).join(', ') + ') and enrol_id='+enrolid;
        pool.query(query,(error,result)=>
        {
            if(error) throw error;
            res.status(200).send("updated");
        })
    }
    const getstudentCourse=(req,res)=>
    
    {    const enrolid=req.params.id;
        console.log(enrolid);
        
        pool.query(queries.getstudentCourse,[enrolid],((error,results)=>
        {
            if(error) throw error;
            console.log(results.rows);
            res.status(200).json(results.rows);
            
            
            
        }))
    };
    const studentCourses=(req,res)=>
    {
        const student=req.params.id;
        
        pool.query(queries.getStudentCourses,[student],((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
        
        
        
    }
    const studentCourse=(req,res)=>
    {
        const student=req.query.stid;
        const enrolid=req.query.enrolid;
        console.log(student,enrolid);
        pool.query(queries.getStudentCourse,[student,enrolid],((error,results)=>
        {
            if(error) throw error;
            res.status(200).json(results.rows);
            
            
        }))
        
        
        
    }
    const timetable=(req,res)=>{
        const sem=req.query.sem;
        const batch=req.query.batch;
        console.log(sem,batch);
        pool.query(queries.getTimetable,[sem,batch],((error,results)=>
        {
            if(error) throw error;
            const inputData=results.rows;
            // const uniqueDays = [...new Set(inputData.map(item => item.day))];
            // const uniqueHours = [...new Set(inputData.map(item => item.hour))];
            const uniqueDays =[1,2,3,4,5];
            const uniqueHours =[1,2,3,4,5,6];
            
            // Create a default structure with empty strings
            const defaultStructure = uniqueDays.map(day => {
                const entry = { day };
                uniqueHours.forEach(hour => {
                    entry[`hour${hour}`] = '-';
                });
                return entry;
            });
            
            // Update the default structure with provided data
            const transformedData = defaultStructure.map(defaultEntry => {
                const { day } = defaultEntry;
                const entriesForDay = inputData.filter(item => item.day === day);
                
                entriesForDay.forEach(entry => {
                    const { hour, course_code } = entry;
                    defaultEntry[`hour${hour}`] = course_code;
                });
                
                return defaultEntry;
            });
            
            console.log(transformedData);
            
            
            res.status(200).json(transformedData);
            
            
        }))
    }

    const updateTimetable=(req,res)=>
        {
            const {timetable,batch,sem}=req.body;
            let firstList=[];
            
            pool.query(queries.getenrolids,[batch,sem],(error,result)=>
            {
                if(error) throw error;
                firstList=result.rows;
                const transformedList = timetable.map(item => {
                    const correspondingEntry = firstList.find(entry => entry.course_code === item.subjectname);
                  
                    if (correspondingEntry) {
                      // Rename 'subjectname' to 'enrolid' and assign the corresponding enrolid value
                      const { subjectname, ...rest } = item;
                      return { ...rest, enrol_id: correspondingEntry.enrol_id };
                    } else {
                      // If subjectname is not found in the first list, remove the element from the list
                      return null;
                    }
                  }).filter(Boolean); // Filter out null entries
                  
                  console.log(transformedList);
                  const queryText = `INSERT INTO timetable (day, hour, enrol_id) VALUES ${transformedList.map((data, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(', ')} RETURNING *`;

                    const values = transformedList.reduce((acc, data) => [...acc, data.day, data.hour, data.enrol_id], []);
                    
                        pool.query(queryText, values)
                        .then(result => {
                            console.log('Data inserted successfully:', result.rows);
                            res.status(201);
                        })
                        .catch(error => {
                            console.error('Error inserting data:', error);
                        })
           })
        }
    module.exports={
        getStudents,
        getStudentsByID,
        addcourse,
        getcourse,
        addStudent,
        deleteStudent,
        // changeName,
        change,
        searchCourseBySem,
        searchTeacher,
        enrolBatch,
        teacherCourses,
        markAttendance,
        getstudentCourse,
        updateMarks,
        updateAttendace, 
        studentCourses,
        studentCourse,
        timetable,
        updateTimetable
        
    };