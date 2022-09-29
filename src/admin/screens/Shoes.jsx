import { useState, useEffect, useContext } from "react";

import AdminContext from "../contexts/AdminContext";

import ShoesAdd from "../components/ShoesAdd";
import ShoesUpdate from "../components/ShoesUpdate";
import ShoesId from "../components/ShoesId";

import axios from "axios";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Shoes = () => {
  const {
    addPopUp,
    modPopUp,
    viewPopUp,
    modId,
    handlePopUpAdd,
    handlePopUpMod,
    handlePopUpView,
  } = useContext(AdminContext);

  const [shoes, setShoes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/shoes").then((res) => setShoes(res.data));
  }, [refresh]);

  function deleteShoes(modId) {
    axios
      .delete(`http://localhost:5002/shoes/${modId}`)
      .then(() => setRefresh(!refresh));
  }

  const rClick = () => {
    const element = document.getElementById("shoesTable");
    element.scrollBy(100, 0);
  };

  const lClick = () => {
    const element = document.getElementById("shoesTable");
    element.scrollBy(-100, 0);
  };

  return (
    <div className="entity" id="entity">
      {addPopUp && <ShoesAdd />}
      {modPopUp && <ShoesUpdate id={modId} />}
      {viewPopUp && <ShoesId id={modId} />}
      <h1 className="entity-title">Articles</h1>
      <div className="adminControls">
        <motion.button
          className="entry-add"
          onClick={handlePopUpAdd}
          whileHover={{ scale: 1.1 }}
        >
          Ajouter un article
        </motion.button>
        <div>
          <input
            className="searchInTable"
            type="text"
            placeholder="Rechercher un article"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="entity-container" id="shoesTable">
        <table className="entity-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Nom</th>
              <th>Image</th>
              <th>Marque</th>
              <th>Taille</th>
              <th>Couleur</th>
              <th>Style</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoes) => (
              <tr key={shoes.id}>
                <th>{shoes.id}</th>
                <td>{shoes.shoes_name}</td>
                <td>{shoes.shoes_img}</td>
                <td>{shoes.shoes_description}</td>
                <td>{shoes.shoes_color}</td>
                <td>{shoes.shoes_brand}</td>
                <td>{shoes.shoes_size}</td>

                <td className="entity-action">
                  <VisibilityOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "lightblue",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpView(shoes.id)}
                  />
                  <ModeEditIcon
                    style={{
                      cursor: "pointer",
                      fill: "white",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpMod(shoes.id)}
                  />

                  <DeleteIcon
                    style={{ cursor: "pointer", fill: "#e71111" }}
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer l'article : ${shoes.shoes_name} ?`
                      ) && deleteShoes(shoes.id);
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

export default Shoes;
