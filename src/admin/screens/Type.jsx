import { useState, useEffect, useContext } from "react";

import AdminContext from "../contexts/AdminContext";

import TypeAdd from "../components/TypeAdd";
import TypeUpdate from "../components/TypeUpdate";
import TypeId from "../components/TypeId";

import axios from "axios";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Type = () => {
  const {
    addPopUp,
    modPopUp,
    viewPopUp,
    modId,
    handlePopUpAdd,
    handlePopUpMod,
    handlePopUpView,
  } = useContext(AdminContext);

  const [type, setType] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/type").then((res) => setType(res.data));
  }, [refresh]);

  function deleteType(modId) {
    axios
      .delete(`http://localhost:5002/type/${modId}`)
      .then(() => setRefresh(!refresh));
  }

  const rClick = () => {
    const element = document.getElementById("typeTable");
    element.scrollBy(100, 0);
  };

  const lClick = () => {
    const element = document.getElementById("typeTable");
    element.scrollBy(-100, 0);
  };

  return (
    <div className="entity" id="entity">
      {addPopUp && <TypeAdd />}
      {modPopUp && <TypeUpdate id={modId} />}
      {viewPopUp && <TypeId id={modId} />}
      <h1 className="entity-title">Styles</h1>
      <div className="adminControls">
        <motion.button
          className="entry-add"
          onClick={handlePopUpAdd}
          whileHover={{ scale: 1.1 }}
        >
          Ajouter un style
        </motion.button>
        <div>
          <input
            className="searchInTable"
            type="text"
            placeholder="Rechercher un style"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="entity-container" id="typeTable">
        <table className="entity-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Style</th>
            </tr>
          </thead>
          <tbody>
            {type.map((type) => (
              <tr key={type.id}>
                <th>{type.id}</th>
                <td>{type.type_name}</td>

                <td className="entity-action">
                  <VisibilityOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "lightblue",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpView(type.id)}
                  />
                  <ModeEditIcon
                    style={{
                      cursor: "pointer",
                      fill: "white",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpMod(type.id)}
                  />

                  <DeleteIcon
                    style={{ cursor: "pointer", fill: "#e71111" }}
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer ce style ? ${type.type_name} ?`
                      ) && deleteType(type.id);
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

export default Type;
