import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img className="logoImg" src={logo} alt="logo E-Sneakers.com" />
      </Link>
    </div>
  );
};

export default Logo;
