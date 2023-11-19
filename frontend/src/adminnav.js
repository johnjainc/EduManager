import { Link } from "react-router-dom";
import './styles/navbar.css';
const AdminNavbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-list">
      <li className="nav-item"><Link to="/admin">Home</Link></li>
        <li className="nav-item">
          <Link to="/add">Add</Link>
        </li>
        <li className="nav-item">
          <Link to="/modify">Modify/View User</Link>
        </li>
        <li className="nav-item">
          <Link to="/enrol">Enrol </Link>
        </li>
        <li className="nav-item">
          <Link to="/timetable">Timetable </Link>
        </li>
        <li className="nav-item">
          <Link to="/">Logout </Link>
        </li>
        
        
      </ul>
    </nav>
  );
}
 
export default AdminNavbar;