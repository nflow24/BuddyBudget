import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import CharacterCustomization from "./pages/CharacterCustomization";
import Goals from "./pages/Goals";
import PlaidConnect from "./pages/PlaidConnect";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomizationReview from "./pages/CustomizationReview";
import InsideAppHome from "./pages/InsideAppHome";
import MonthlySavings from "./pages/MonthlySavings";
import Money from "./pages/Money";
import Friends from "./pages/Friends";
import Leaderboard from "./pages/Leaderboard";
import TransactionsDebug from "./pages/TransactionsDebug";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customize" element={<CharacterCustomization />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/customize/review" element={<CustomizationReview />} />
          <Route path="/home" element={<InsideAppHome />} />
          <Route path="/money" element={<Money />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/connect-bank" element={<PlaidConnect />} />
          <Route path="/monthly-savings" element={<MonthlySavings />} />
          <Route path="/me" element={<MonthlySavings />} />
          <Route path="/debug/transactions" element={<TransactionsDebug />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
