import { Link } from "react-router-dom";
import './styles/navbar.css';
const TeacherNavbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-list">
      <li className="nav-item"><Link to="/teacher">Home</Link></li>
      <li className="nav-item"><Link to="/">Logout</Link></li>
       
        
        
      </ul>
    </nav>
  );
}
 
export default TeacherNavbar;