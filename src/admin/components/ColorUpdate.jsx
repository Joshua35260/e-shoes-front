import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";

import axios from "axios";

const ColorUpdate = () => {
  const { handlePopUpMod, modId } = useContext(AdminContext);
  //stockage donnée placeholder//
  const [defaultValue, setDefaultValue] = useState({});

  const [colorName, setColorName] = useState("");

  const [isSuccess, setIsSuccess] = useState(null);

  //charge données pour le placeholder//
  useEffect(() => {
    axios.get(`http://localhost:5002/color/${modId}`).then((res) => {
      setDefaultValue(res.data[0]);
      setColorName(res.data[0].color_name);
    });
  }, []);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      color_name: colorName,
    };

    axios.put(`http://localhost:5002/color/edit/${modId}`, data).then((res) => {
      console.warn(res);
      if (res.data.success === 1) {
        setIsSuccess({
          message: "Modification de la couleur validée",
        });
      } else {
        setIsSuccess({
          message: "Modification de la couleur refusée",
        });
      }
    });
  };
  useEffect(() => {
    if (isSuccess?.uploadOk) {
      const timer = setTimeout(() => navigate(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <>
      {defaultValue && (
        <div className="admin">
          <p className="logout">Logout</p>

          <div className="adminRightBand addForm">
            <div className="modalBg" onClick={handlePopUpMod}></div>
            <form className="adminForm" onSubmit={(e) => submit(e)}>
              <p className="adminTitle">Modifier une couleur</p>
              <div className="adminChamp">
                <label htmlFor="adminName">couleur</label>
                <input
                  type="text"
                  id="adminName"
                  name="color_name"
                  placeholder="couleur"
                  onChange={(e) => setColorName(e.target.value)}
                  required
                />
              </div>
              {isSuccess !== null ? (
                <h4
                  style={{
                    color: "green",
                    textAlign: "center",
                    border: "1px solid white",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    padding: "0.5em 0",
                    margin: "1.5em 0 0 0",
                  }}
                >
                  {isSuccess.message}
                </h4>
              ) : null}
              <button className="adminFormButton" type="submit">
                Modifier
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ColorUpdate;
