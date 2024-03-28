import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Agreements from "./pages/Agreements/Agreements"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/About/About";
import Allfiles from "./pages/AllFiles/Allfiles";
import AdminHome from "../src/admin/adminhome/AdminHome"
import Allreports from "../src/admin/AllReports/Allreports"
import Group from "./admin/group/Group";
import UserGroup from "./pages/usergroup/UserGroup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/about" element={<About/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/agreement" element={<Agreements/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/all" element={<Allfiles/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/files" element={<Allreports/>}/>
        <Route path="/group" element={<Group/>}/>
        <Route path="/usergroup" element={<UserGroup/>}/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
