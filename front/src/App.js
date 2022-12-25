import "./App.css";
import UserLogin from "./pages/UserLogin";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import User from "./pages/User";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user" element={<User />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
