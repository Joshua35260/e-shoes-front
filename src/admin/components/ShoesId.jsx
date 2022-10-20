import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AdminContext from "../contexts/AdminContext";

import axios from "axios";
import { motion } from "framer-motion";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ShoesId = () => {
  const { handlePopUpView, handleActionMod, modId } = useContext(AdminContext);

  const [shoes, setShoes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/shoes/${modId}`)
      .then((res) => setShoes(res.data));
  }, [refresh]);

  const navigate = useNavigate();

  function deleteShoes(modId) {
    axios
      .delete(`http://localhost:5002/shoes/${modId}`)
      .then((res) => console.log(res.data))
      .then(() => setRefresh(!refresh))
      .then(handlePopUpView)
      .then(navigate(0));
  }

  return (
    <div className="ShoesId">
      {shoes.length && (
        <div className="addForm">
          <div className="modalBg" onClick={handlePopUpView}></div>
          <div className="adminForm">
            <div className="adminTitleShow">
              <h1 className="viewTitle">Informations générales</h1>
            </div>
            <div className="headInfo">
              <fieldset>
                <legend>Nom de l'article</legend>
                <h1>{shoes[0].shoes_name}</h1>
              </fieldset>
            </div>
            <div className="adressContainer">
              <div className="pictureContainer">
                <figure>
                  <figcaption>Illustration {shoes[0].shoes_name}</figcaption>
                  <img
                    className="regionPicture"
                    src={`http://localhost:5002/images/shoes/${shoes[0].shoes_img}`}
                    alt={shoes[0].shoes_name}
                  />
                </figure>
              </div>
            </div>
            <div className="contactInfo">
              <fieldset>
                <legend>Marque</legend>
                <h1>{shoes[0].brand_name}</h1>
              </fieldset>
              <fieldset>
                <legend>Couleur</legend>
                <h1>{shoes[0].color_name}</h1>
              </fieldset>
            </div>
            <div className="openingHours">
              <legend>Taille</legend>
              <h1>{shoes[0].size_name}</h1>
            </div>
            <div className="descInfo">
              <div className="descContainer">
                <fieldset>
                  <legend>Description</legend>
                  <div className="contDesc">
                    <p>{shoes[0].shoes_description}</p>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="actionsTable">
              <motion.div
                className="iconBg"
                onClick={handleActionMod}
                whileHover={{ scale: 1.2 }}
              >
                <ModeEditIcon
                  style={{
                    cursor: "pointer",
                    fill: "black",
                  }}
                />
              </motion.div>
              <motion.div
                className="iconBg"
                onClick={() => {
                  window.confirm(
                    `Êtes-vous sûr de vouloir supprimer cet article : ${shoes[0].shoes_name} ?`
                  ) && deleteShoes(modId);
                }}
                whileHover={{ scale: 1.2 }}
              >
                <DeleteIcon style={{ cursor: "pointer", fill: "black" }} />
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoesId;
