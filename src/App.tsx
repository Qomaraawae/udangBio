import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UdangProvider } from "./context/UdangContext";
import { Navbar } from "./components/Common/Navbar";
import { HomePage } from "./pages/HomePage";
import { HistoryPage } from "./pages/HistoryPage";
import { TentangPage } from "./pages/TentangPage";

function App() {
  return (
    <UdangProvider>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/History" element={<HistoryPage />} />
          <Route path="/About" element={<TentangPage />} />
        </Routes>
      </Router>
    </UdangProvider>
  );
}

export default App;
