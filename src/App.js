import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Components/utils/PrivateRoutes";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Route pages/Dashboard/Dashboard";
import Vendors from "./Components/Route pages/Vendors/Vendors";
import Projects from "./Components/Route pages/Projects/Projects";
import Invoices from "./Components/Route pages/Invoice/Invoices";
import Profile from "./Components/Route pages/Profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Registration />} path="/registration" />
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/dashboard" exact />
        <Route element={<Vendors />} path="/vendors" exact />
        <Route element={<Projects />} path="/projects" exact />
        <Route element={<Invoices />} path="/invoices" exact />
        <Route element={<Profile />} path="/profile" exact />
      </Route>
    </Routes>
  );
};

export default App;
