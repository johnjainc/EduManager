

const getStudents="SELECT * FROM users";
const addcourse="INSERT INTO courses (code,name,credits,sem) VALUES ($1,$2,$3,$4)";
const getStudentsByID="SELECT * FROM users WHERE id=$1";
const addStudent="INSERT INTO users (id,name,batch,type,semester) VALUES ($1,$2,$3,$4,$5)";
const getcourse="SELECT * FROM courses WHERE code=$1";
const addToEnrol="insert into enrol (course_code,batch,teacher_id,semester) VALUES ($1,$2,$3,$4) ";
const addStudentnb="INSERT INTO users (id,name,type) VALUES ($1,$2,$3)";
const deleteStudent="delete from users where id =$1 ";
const searchCourseBySem="select * from  courses where sem=$1";
const getTeacher="select * from users where upper(name) like upper($1) and type = 'teacher'";
// changeName="update users set name=$1 where id=$2";
change="update users set name=$1,batch=$2 where id=$3";
const getTeacherCourses="select * from  enrol where teacher_id=$1";

const markAttendance=`UPDATE student_course SET present_hrs = CASE WHEN st_id NOT IN ($1) THEN present_hrs + 1 ELSE present_hrs END, total_hrs = total_hrs+1 where enrol_id=$2`; 
const getstudentCourse="SELECT sc.st_id,sc.enrol_id,sc.marks,sc.present_hrs,sc.total_hrs,u.name FROM student_course as sc left join users as u on sc.st_id=u.id WHERE sc.enrol_id=$1 order by u.name";
const getStudentCourses="select * from  users as u left join enrol as e on u.batch=e.batch and u.semester=e.semester where u.id=$1";
const getStudentCourse='select * from student_course where st_id=$1 and enrol_id=$2';
const getTimetable="select * from timetable as t left join enrol as e on t.enrol_id=e.enrol_id where e.semester=$1 and e.batch=$2";
const getenrolids="select course_code,enrol_id from enrol where batch=$1 and semester=$2";
module.exports={
    getStudents,
    getStudentsByID,
    addStudent,
    deleteStudent,
    // changeName,
    searchCourseBySem,

    change,
    addStudentnb,
    getcourse,
    addcourse,
    getTeacher,
    addToEnrol,
    getTeacherCourses,
    markAttendance,
    getstudentCourse,
    getStudentCourses,
    getStudentCourse,
    getTimetable,
    getenrolids
    

};