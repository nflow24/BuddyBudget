import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import CharacterCustomization from "./pages/CharacterCustomization";
import Goals from "./pages/Goals";
import PlaidConnect from "./pages/PlaidConnect";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customize" element={<CharacterCustomization />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/connect-bank" element={<PlaidConnect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;