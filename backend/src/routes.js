const {Router}=require("express");
const controller=require("./controller");
 
const router=Router();
router.post("/add",controller.addStudent);
router.get("/",controller.getStudents);
router.get("/searchCourseBySem/:sem",controller.searchCourseBySem);
router.get("/searchTeacher/:teacher",controller.searchTeacher);
router.get("/:id",controller.getStudentsByID);
router.get("/course/:id",controller.getcourse);
router.post("/course/add",controller.addcourse);
router.delete("/remove",controller.deleteStudent);
router.put("/change",controller.change);
router.post("/enrol",controller.enrolBatch);
router.get("/teacher/courses/:id",controller.teacherCourses);
router.get("/teacher/student_course/:id",controller.getstudentCourse);
router.put("/teacher/markattendance",controller.markAttendance);
router.put("/teacher/updatemarks",controller.updateMarks);
router.put("/teacher/updateattendance",controller.updateAttendace);
router.get("/student/courses/:id",controller.studentCourses);
router.get("/student/course",controller.studentCourse);
router.get("/timetable/student",controller.timetable);
router.post("/timetable/student",controller.updateTimetable);

// router.put("/:id",controller.changeName);

module.exports=router;