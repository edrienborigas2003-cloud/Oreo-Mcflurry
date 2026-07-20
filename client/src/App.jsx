import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Favorites from "./pages/Favorites";

function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>🍦 ForkRank</h1>
      <p>Restaurant Discovery App</p>
      <nav>
        <Link to="/favorites">My Favorites</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;