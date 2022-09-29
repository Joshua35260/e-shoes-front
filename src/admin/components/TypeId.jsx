import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const TypeId = () => {
  const { handlePopUpView, handleActionMod, modId } = useContext(AdminContext);

  const [type, setType] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/type/${modId}`)
      .then((res) => setType(res.data));
  }, [refresh]);

  const navigate = useNavigate();

  function deletetype(modId) {
    axios
      .delete(`http://localhost:5002/type/${modId}`)
      .then((res) => console.log(res.data))
      .then(() => setRefresh(!refresh))
      .then(handlePopUpView)
      .then(navigate(0));
  }

  return (
    <div className="typeId">
      {type.length && (
        <div className="addForm">
          <div className="modalBg" onClick={handlePopUpView}></div>
          <div className="adminForm">
            <div className="adminTitleShow">
              <h1 className="viewTitle">Informations générales</h1>
            </div>
            <div className="headInfo">
              <fieldset>
                <legend>Style</legend>
                <h1>{type[0].type_name}</h1>
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
                    `Êtes-vous sûr de vouloir supprimer ce style ? ${type[0].type_name} ?`
                  ) && deletetype(modId);
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

export default TypeId;
