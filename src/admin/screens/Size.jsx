import { useState, useEffect, useContext } from "react";

import AdminContext from "../contexts/AdminContext";

import SizeAdd from "../components/SizeAdd";
import SizeUpdate from "../components/SizeUpdate";
import SizeId from "../components/SizeId";

import axios from "axios";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Size = () => {
  const {
    addPopUp,
    modPopUp,
    viewPopUp,
    modId,
    handlePopUpAdd,
    handlePopUpMod,
    handlePopUpView,
  } = useContext(AdminContext);

  const [size, setSize] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/size").then((res) => setSize(res.data));
  }, [refresh]);

  function deleteSize(modId) {
    axios
      .delete(`http://localhost:5002/size/${modId}`)
      .then(() => setRefresh(!refresh));
  }

  const rClick = () => {
    const element = document.getElementById("sizeTable");
    element.scrollBy(100, 0);
  };

  const lClick = () => {
    const element = document.getElementById("sizeTable");
    element.scrollBy(-100, 0);
  };

  return (
    <div className="entity" id="entity">
      {addPopUp && <SizeAdd />}
      {modPopUp && <SizeUpdate id={modId} />}
      {viewPopUp && <SizeId id={modId} />}
      <h1 className="entity-title">Tailles</h1>
      <div className="adminControls">
        <motion.button
          className="entry-add"
          onClick={handlePopUpAdd}
          whileHover={{ scale: 1.1 }}
        >
          Ajouter une taille
        </motion.button>
        <div>
          <input
            className="searchInTable"
            type="text"
            placeholder="Rechercher une taille"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="entity-container" id="sizeTable">
        <table className="entity-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Taille</th>
            </tr>
          </thead>
          <tbody>
            {size.map((size) => (
              <tr key={size.id}>
                <th>{size.id}</th>
                <td>{size.size_name}</td>

                <td className="entity-action">
                  <VisibilityOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "lightblue",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpView(size.id)}
                  />
                  <ModeEditIcon
                    style={{
                      cursor: "pointer",
                      fill: "white",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpMod(size.id)}
                  />

                  <DeleteIcon
                    style={{ cursor: "pointer", fill: "#e71111" }}
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer cette taille ? ${size.size_name} ?`
                      ) && deleteSize(size.id);
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

export default Size;
