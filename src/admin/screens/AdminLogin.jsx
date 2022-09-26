import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";

import AdminContext from "../contexts/AdminContext";
import { login } from "../services/AuthApi";

import { motion } from "framer-motion";

import AnnouncementIcon from "@mui/icons-material/Announcement";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const AdminLogin = () => {
  //Détermine la visibilité du mot de passe et l'icone associée
  let navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AdminContext);
  const [visiblePass, setVisiblePass] = useState(false);
  //Message d'alerte en cas de mauvais identifiants à la confirmation d'identité
  const [warn, setWarn] = useState(false);
  const [icon, setIcon] = useState(false);
  //Récupération des infos entrées par l'utilisateur
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/admin/shoes");
  }, [isAuthenticated]);

  const handleClick = () => {
    setVisiblePass(!visiblePass);
    setIcon(!icon);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      setIsAuthenticated(response);
      setWarn(false);
    } catch ({ response }) {
      setWarn(true);
      console.log(response);
    }
  };

  return (
    <div className="adminLogin">
      <Logo />
      <form className="loginForm">
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <label htmlFor="password">Mot de passe : </label>
        <div className="passwordField">
          <input
            type={visiblePass ? "text" : "password"}
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          {icon ? (
            <VisibilityOutlinedIcon
              className="visibility"
              onClick={() => handleClick()}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="visibility"
              onClick={() => handleClick()}
            />
          )}
        </div>
        {warn && (
          <motion.div
            className="warnContainer"
            initial={{ x: 0 }}
            animate={{ x: [10, 0, 10, 0, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <AnnouncementIcon className="warnIcon" />
            <p className="warn">Identifiants incorrects</p>
          </motion.div>
        )}
        <button
          value="Se connecter"
          className="submit"
          onClick={(e) => submitLogin(e)}
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
