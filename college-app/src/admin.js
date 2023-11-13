import { Link } from "react-router-dom";
const Admin = () => {
    return (

        <div><h1>admin panel</h1>
        <ul>
        <Link to="/modify">Modify/View User</Link>
        </ul>
        <ul>
        <Link to="/add">Add User</Link>
        </ul>
        <ul>
        <Link to="/addcourse">Add Course </Link>
        </ul>
        <ul>
        <Link to="/enrol">Enrol </Link>
        </ul>
        <ul>
        <Link to="/timetable">Timetable </Link>
        </ul>
        
        </div>
      );
}
 
export default Admin;