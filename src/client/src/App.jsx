import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customize" element={<CharacterCustomization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;