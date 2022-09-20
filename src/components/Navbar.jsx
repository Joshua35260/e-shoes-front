import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import logo from "../assets/images/logo.png";
const Navbar = () => {
  return (
    <header>
      <div className="navbarContainer">
        <div className="firstNav">
          <NavLink to="/">
            <img src={logo} className="logo" alt="logo E-sneaker.com" />
          </NavLink>
          <input
            type="text"
            className="inputNav"
            placeholder="Rechercher un produit, une marque"
          />
        </div>
        <div className="secondNav">
          <NavLink
            to="/homme"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>HOMME</div>
          </NavLink>
          <NavLink
            to="/femme"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>FEMME</div>
          </NavLink>
          <NavLink
            to="/enfant"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>ENFANT</div>
          </NavLink>
          <NavLink
            to="/brand"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>MARQUES</div>
          </NavLink>
        </div>
        <div className="thirdNav">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>
              <Icon.User size={28} />
            </div>
          </NavLink>
          <NavLink
            to="/fav"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>
              <Icon.Heart size={28} />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <div>
              <Icon.ShoppingCart size={28} />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
