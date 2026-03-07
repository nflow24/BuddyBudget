import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import CharacterCustomization from "./pages/CharacterCustomization";
import Goals from "./pages/Goals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomizationReview from "./pages/CustomizationReview";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customize" element={<CharacterCustomization />} />
        <Route path="/goals" element={<Goals />} />

        <Route path="/customize/review" element={<CustomizationReview />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;