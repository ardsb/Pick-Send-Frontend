import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Screens/RegisterPage";
import HomepageReciever from "./Screens/HomepageReciever";
import HomepageSender from "./Screens/HompageSender";
import AdminPage from "./Screens/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="homepageSender" element={<HomepageSender />} />
      <Route path="homepageReciever" element={<HomepageReciever />} />
    </Routes>
  );
}

export default App;
