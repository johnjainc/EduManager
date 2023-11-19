import Login from "./login";
import Student from "./student";
import Admin from "./admin";
import Modify from "./modify";
import Adduser from "./adduser";
import Enrol from "./enrol";
import Course from "./course";
import Teacher from "./teacher";
import Addcourse from "./addcourse";
import StudentCourse from "./studentcourse";
import TimetableStudent from "./timetablestudent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState  } from "react";
import React from 'react';

import TimetableActions from "./timetableActions";

export const IDContext = React.createContext();
function App() {
  const [UserID, setUserID] = useState('--');
  const [sem, setsem] = useState('');
  const [batch, setbatch] = useState('');
  return (
    <Router>
      <div className="App">
        
        <div className="content">
          <Switch>
            
          <IDContext.Provider value={{ UserID, setUserID,sem,setsem,batch,setbatch}}>
          
            <Route exact path="/student">
              <Student />
              </Route>
              <Route exact path="/modify">
              <Modify />
            </Route>
            <Route exact path="/add">
              <Adduser />
            </Route>
            <Route exact path="/timetable">
              <TimetableActions />
            </Route>
            
            <Route exact path="/addcourse">
              <Addcourse />
            </Route>
            <Route exact path="/enrol">
              <Enrol />
            </Route>
            <Route exact path="/teacher/courses/:enrol_id">
              <Course/>
              </Route>
              <Route exact path="/student/courses/:enrol_id">
              <StudentCourse/>
              </Route>
              <Route exact path="/student/timetable">
              <TimetableStudent/>
              </Route>
              
              
            
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/teacher">
              <Teacher />
            </Route>
            </IDContext.Provider>
            
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
