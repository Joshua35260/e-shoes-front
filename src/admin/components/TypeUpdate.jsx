import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";

import axios from "axios";

const TypeUpdate = () => {
  const { handlePopUpMod, modId } = useContext(AdminContext);
  //stockage donnée placeholder//
  const [defaultValue, setDefaultValue] = useState({});

  const [typeName, setTypeName] = useState("");

  const [isSuccess, setIsSuccess] = useState(null);

  //charge données pour le placeholder//
  useEffect(() => {
    axios.get(`http://localhost:5002/type/${modId}`).then((res) => {
      setDefaultValue(res.data[0]);
      setTypeName(res.data[0].type_name);
    });
  }, []);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      type_name: typeName,
    };

    axios.put(`http://localhost:5002/type/edit/${modId}`, data).then((res) => {
      console.warn(res);
      if (res.data.success === 1) {
        setIsSuccess({
          message: "Modification du style validé",
        });
      } else {
        setIsSuccess({
          message: "Modification du style refusé",
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
              <p className="adminTitle">Modifier un style</p>
              <div className="adminChamp">
                <label htmlFor="adminName">Style</label>
                <input
                  type="text"
                  id="adminName"
                  name="type_name"
                  placeholder="Style"
                  onChange={(e) => setTypeName(e.target.value)}
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

export default TypeUpdate;
