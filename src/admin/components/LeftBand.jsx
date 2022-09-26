import { NavLink } from "react-router-dom";

const LeftBand = () => {
  return (
    <>
      <nav className="adminLeftBand">
        <NavLink
          to="shoes"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Articles</h2>
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Utilisateurs</h2>
        </NavLink>
      </nav>
    </>
  );
};

export default LeftBand;
