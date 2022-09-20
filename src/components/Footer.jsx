import { useState } from "react";
import * as Icon from "react-feather";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import facebookImg from "../assets/images/facebook.png";
import instagramImg from "../assets/images/instagram2.png";
import twitterImg from "../assets/images/twitter.png";

const Footer = () => {
  const [openNav, setopenNav] = useState(true);

  function miracleNav() {
    setopenNav(!openNav);
  }

  return (
    <>
      <footer>
        <div>
          <p className="resaux">Suivez nous sur nos réseaux :</p>
          <div className="footerbody">
            <ul className="image">
              <li className="logoSitefooter display">
                <Link to="/">
                  <img
                    id="logof"
                    src={logo}
                    className="logoSiteFooter"
                    alt="logo E-Sneakers.com"
                  ></img>
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/"
                  rel="noreferrer"
                >
                  <img src={facebookImg} alt="logo facebook"></img>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                >
                  <img src={twitterImg} alt="logo twitter"></img>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/" rel="noreferrer">
                  <img src={instagramImg} alt="logo instagram"></img>
                </a>
              </li>
            </ul>
            <div className="nav">
              <NavLink to={`/user}`}>
                <Icon.ShoppingCart size={38} className="footer_profil" />
              </NavLink>
              <label
                htmlFor="toggle"
                onClick={miracleNav}
                className={`labelActive ${openNav ? "notRotate" : "rotate180"}`}
              >
                ☰
              </label>
              <input type="checkbox" id="toggle" />
              <div className="mobileMenu">
                <ul className="redirection">
                  <li className="action">
                    <NavLink
                      to="/"
                      className={({ isActive }) => {
                        return isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer";
                      }}
                    >
                      Accueil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/store"
                      className={({ isActive }) => {
                        return isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer";
                      }}
                    >
                      Store
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/fav"
                      className={({ isActive }) => {
                        return isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer";
                      }}
                    >
                      Favoris
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer"
                      }
                    >
                      À propos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer"
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "redirection-active link-footer footer-active"
                          : "btn-inactive link-footer"
                      }
                    >
                      Connexion
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="copyright">Copyright Ⓒ - E-Sneakers - 2022</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
