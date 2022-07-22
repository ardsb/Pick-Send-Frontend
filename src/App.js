import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./Screens/admin/AdminHome";
import Login from "./Screens/Login";
import AdminListPackages from "./Screens/admin/AdminListPackages";
import ListOperationCenter from "./Screens/admin/ListOperationCenter";
import SenderHome from "./Screens/sender/SenderHome";
import SenderListPackage from "./Screens/sender/SenderListPackage";
import ReceiverHome from "./Screens/receiver/ReceiverHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="admin/" element={<AdminHome />} >
            <Route path="home" element={<AdminHome />} />
            <Route path="listPackage" element={<AdminListPackages />} />
            <Route path="listOperationCenter" element={<ListOperationCenter />} />
        </Route>
        <Route path="sender/" element={<SenderHome />} >
            <Route path="home" element={<SenderHome />} />
            <Route path="listPackage" element={<SenderListPackage />} />
        </Route>
        <Route path="receiver/" element={<ReceiverHome />} >
            <Route path="home" element={<ReceiverHome />} />
        </Route>
      <Route path="adminListPa" element={<AdminHome />} />
    </Routes>
  );
}

export default App;
