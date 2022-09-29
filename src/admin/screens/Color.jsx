import { useState, useEffect, useContext } from "react";

import AdminContext from "../contexts/AdminContext";

import ColorAdd from "../components/ColorAdd";
import ColorUpdate from "../components/ColorUpdate";
import ColorId from "../components/ColorId";

import axios from "axios";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Color = () => {
  const {
    addPopUp,
    modPopUp,
    viewPopUp,
    modId,
    handlePopUpAdd,
    handlePopUpMod,
    handlePopUpView,
  } = useContext(AdminContext);

  const [color, setColor] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/color").then((res) => setColor(res.data));
  }, [refresh]);

  function deleteColor(modId) {
    axios
      .delete(`http://localhost:5002/color/${modId}`)
      .then(() => setRefresh(!refresh));
  }

  const rClick = () => {
    const element = document.getElementById("colorTable");
    element.scrollBy(100, 0);
  };

  const lClick = () => {
    const element = document.getElementById("colorTable");
    element.scrollBy(-100, 0);
  };

  return (
    <div className="entity" id="entity">
      {addPopUp && <ColorAdd />}
      {modPopUp && <ColorUpdate id={modId} />}
      {viewPopUp && <ColorId id={modId} />}
      <h1 className="entity-title">Couleurs</h1>
      <div className="adminControls">
        <motion.button
          className="entry-add"
          onClick={handlePopUpAdd}
          whileHover={{ scale: 1.1 }}
        >
          Ajouter une couleur
        </motion.button>
        <div>
          <input
            className="searchInTable"
            type="text"
            placeholder="Rechercher une couleur"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="entity-container" id="colorTable">
        <table className="entity-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Couleur</th>
            </tr>
          </thead>
          <tbody>
            {color.map((color) => (
              <tr key={color.id}>
                <th>{color.id}</th>
                <td>{color.color_name}</td>

                <td className="entity-action">
                  <VisibilityOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "lightblue",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpView(color.id)}
                  />
                  <ModeEditIcon
                    style={{
                      cursor: "pointer",
                      fill: "white",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpMod(color.id)}
                  />

                  <DeleteIcon
                    style={{ cursor: "pointer", fill: "#e71111" }}
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer cette couleur ? ${color.color_name} ?`
                      ) && deleteColor(color.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="adminTableNav">
        <div className="navIconContainer">
          <ArrowBackIosNewIcon
            onClick={() => lClick()}
            className="adminTableNavButton"
          />
        </div>
        <div className="navIconContainer">
          <ArrowForwardIosIcon
            onClick={() => rClick()}
            className="adminTableNavButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Color;
