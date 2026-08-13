import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import Enquiry from "./Enquiry";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import PhoneLogin from "./PhoneLogin";
import LoginEnquiry from "./LoginEnquiry";
import AdminEnquiry from "./AdminEnquiry";
import AdminPhoneLogin from "./AdminPhoneLogin";

function App() {

  return(
    <BrowserRouter>
          <Routes>
             <Route path="/" element={<Enquiry/>}/>
             <Route path="/Registration" element={<Registration/>}/>
             <Route path="/Home" element={<Home/>}/>
             <Route path="/Login" element={<Login/>}/>
             <Route path="/AdminLogin" element={<AdminLogin/>}/>
             <Route path="/AdminHome" element={<AdminHome/>}/>
             <Route path="/PhoneLogin" element={<PhoneLogin/>}/>
             <Route path="/LoginEnquiry" element={<LoginEnquiry/>}/>
             <Route path="/AdminEnquiry" element={<AdminEnquiry/>}/>
             <Route path="/AdminPhoneLogin" element={<AdminPhoneLogin/>}/>
          </Routes>
    </BrowserRouter>
  );

}

export default App
