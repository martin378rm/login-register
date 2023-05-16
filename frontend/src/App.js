import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./Components/Login";
import { Register } from "./Components/Register";
import { Dashboard } from "./Components/Dashboard";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div><Navbar/><Dashboard/></div>} />
      </Routes>
    </Router>
  );
}

export default App;

// import { Login } from "./Components/Login.js"
// import { Register } from "./Components/Register.js";
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom"