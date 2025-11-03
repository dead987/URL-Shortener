import {  Routes, Route } from 'react-router-dom';
import Register from "../../models/user/pages/Register";
import Header from "../../models/landing-page/Header";
import  Login  from '../../models/user/pages/Login';
import Dashboard from '../../models/dashboard/Dashboard'

const AppRoutes = () => {
    return (
        
        
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

        
    )
}
export default AppRoutes;