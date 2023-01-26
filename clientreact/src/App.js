import {
  BrowserRouter as Router,
  Route,Routes
} from "react-router-dom";
import './App.css';

import Loginform from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import DashBoard from "./components/dashBoard";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <div>
    <Router>
       <Routes>
       <Route path="/login" element={<Loginform/>}/>
       <Route path="/signUp" element={<SignUpForm/>}/>
       
       <Route element={<PrivateRoute />}>
       <Route path="/" element={<DashBoard/>}/>
       </Route>
       
       </Routes>      
   </Router>
   </div>

  );
}

export default App;
