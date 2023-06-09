import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
