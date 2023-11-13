import { Link } from "react-router-dom";
import './styles/navbar.css';
const StudentNavbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-list">
      <li className="nav-item"><Link to="/student">Home</Link></li>
      <li className="nav-item"><Link to="/">Logout</Link></li>
       
        
        
      </ul>
    </nav>
  );
}
 
export default StudentNavbar;