import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import AdminContext from "../contexts/AdminContext";
import { logout } from "../services/AuthApi";

import AdminReset from "../components/AdminReset";
import LeftBand from "../components/LeftBand";
import Logo from "../../components/Logo";

const Admin = () => {
  const { setIsAuthenticated, setTriggered, setViewPopUp } =
    useContext(AdminContext);

  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleChangePass = () => {
    setTriggered(true);
  };
  // eslint-disable-next-line
  addEventListener("popstate", (e) => {
    setViewPopUp(false);
  });

  return (
    <div className="admin">
      <p className="logout" onClick={handleLogout}>
        Logout
      </p>
      <p className="changeCredentials" onClick={handleChangePass}>
        Changer identifiants
      </p>
      <LeftBand />
      <div className="adminRightBand">
        <Logo />

        <Outlet />
      </div>
      <AdminReset />
    </div>
  );
};
export default Admin;
