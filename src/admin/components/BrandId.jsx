import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const BrandId = () => {
  const { handlePopUpView, handleActionMod, modId } = useContext(AdminContext);

  const [brand, setbrand] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/brand/${modId}`)
      .then((res) => setbrand(res.data));
  }, [refresh]);

  const navigate = useNavigate();

  function deleteBrand(modId) {
    axios
      .delete(`http://localhost:5002/brand/${modId}`)
      .then((res) => console.log(res.data))
      .then(() => setRefresh(!refresh))
      .then(handlePopUpView)
      .then(navigate(0));
  }

  return (
    <div className="brandId">
      {brand.length && (
        <div className="addForm">
          <div className="modalBg" onClick={handlePopUpView}></div>
          <div className="adminForm">
            <div className="adminTitleShow">
              <h1 className="viewTitle">Informations générales</h1>
            </div>
            <div className="headInfo">
              <fieldset>
                <legend>Nom de la marque</legend>
                <h1>{brand[0].brand_name}</h1>
              </fieldset>
            </div>
            <div className="adressContainer">
              <div className="pictureContainer">
                <figure>
                  <figcaption>Illustration {brand[0].brand_name}</figcaption>
                  <img
                    className="regionPicture"
                    src={`http://localhost:5002/images/brand/${brand[0].brand_logo}`}
                    alt={brand[0].brand_name}
                  />
                </figure>
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
                    `Êtes-vous sûr de vouloir supprimer cette marque: ${brand[0].brand_name} ?`
                  ) && deleteBrand(modId);
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

export default BrandId;
