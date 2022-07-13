import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Screens/RegisterPage";
import HomepageSender from "./Screens/HompageSender";
import AdminPage from "./Screens/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="homepageSender" element={<HomepageSender />} />
    </Routes>
  );
}

export default App;
