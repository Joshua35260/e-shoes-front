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
          to="brand"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Marques</h2>
        </NavLink>
        <NavLink
          to="size"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Tailles</h2>
        </NavLink>
        <NavLink
          to="type"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Styles</h2>
        </NavLink>
        <NavLink
          to="colors"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <h2>Couleurs</h2>
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
