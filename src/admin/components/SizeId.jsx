import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const SizeId = () => {
  const { handlePopUpView, handleActionMod, modId } = useContext(AdminContext);

  const [size, setSize] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/size/${modId}`)
      .then((res) => setSize(res.data));
  }, [refresh]);

  const navigate = useNavigate();

  function deleteSize(modId) {
    axios
      .delete(`http://localhost:5002/size/${modId}`)
      .then((res) => console.log(res.data))
      .then(() => setRefresh(!refresh))
      .then(handlePopUpView)
      .then(navigate(0));
  }

  return (
    <div className="sizeId">
      {size.length && (
        <div className="addForm">
          <div className="modalBg" onClick={handlePopUpView}></div>
          <div className="adminForm">
            <div className="adminTitleShow">
              <h1 className="viewTitle">Informations générales</h1>
            </div>
            <div className="headInfo">
              <fieldset>
                <legend>Taille</legend>
                <h1>{size[0].size_name}</h1>
              </fieldset>
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
                    `Êtes-vous sûr de vouloir supprimer cette taille ? ${size[0].size_name} ?`
                  ) && deleteSize(modId);
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

export default SizeId;
