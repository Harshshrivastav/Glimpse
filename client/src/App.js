import './App.css';
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/screens/Home";
import SignIn from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import EditProfile from "./components/screens/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/createpost" element={<ProtectedRoute element={CreatePost} />} />
        <Route path="/editprofile" element={<ProtectedRoute element={EditProfile} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
