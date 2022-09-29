import { useState, useEffect, useContext } from "react";

import AdminContext from "../contexts/AdminContext";

import BrandAdd from "../components/BrandAdd";
import BrandUpdate from "../components/BrandUpdate";
import BrandId from "../components/BrandId";

import axios from "axios";
import { motion } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Brand = () => {
  const {
    addPopUp,
    modPopUp,
    viewPopUp,
    modId,
    handlePopUpAdd,
    handlePopUpMod,
    handlePopUpView,
  } = useContext(AdminContext);

  const [brand, setBrand] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/brand").then((res) => setBrand(res.data));
  }, [refresh]);

  function deleteBrand(modId) {
    axios
      .delete(`http://localhost:5002/brand/${modId}`)
      .then(() => setRefresh(!refresh));
  }

  const rClick = () => {
    const element = document.getElementById("brandTable");
    element.scrollBy(100, 0);
  };

  const lClick = () => {
    const element = document.getElementById("brandTable");
    element.scrollBy(-100, 0);
  };

  return (
    <div className="entity" id="entity">
      {addPopUp && <BrandAdd />}
      {modPopUp && <BrandUpdate id={modId} />}
      {viewPopUp && <BrandId id={modId} />}
      <h1 className="entity-title">Articles</h1>
      <div className="adminControls">
        <motion.button
          className="entry-add"
          onClick={handlePopUpAdd}
          whileHover={{ scale: 1.1 }}
        >
          Ajouter une marque
        </motion.button>
        <div>
          <input
            className="searchInTable"
            type="text"
            placeholder="Rechercher une marque"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="entity-container" id="brandTable">
        <table className="entity-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Nom</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {brand.map((brand) => (
              <tr key={brand.id}>
                <th>{brand.id}</th>
                <td>{brand.brand_name}</td>
                <td>{brand.brand_logo}</td>
                <td className="entity-action">
                  <VisibilityOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "lightblue",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpView(brand.id)}
                  />
                  <ModeEditIcon
                    style={{
                      cursor: "pointer",
                      fill: "white",
                      marginRight: "12",
                    }}
                    onClick={() => handlePopUpMod(brand.id)}
                  />

                  <DeleteIcon
                    style={{ cursor: "pointer", fill: "#e71111" }}
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer la marque ? ${brand.brand_name} ?`
                      ) && deleteBrand(brand.id);
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

export default Brand;
