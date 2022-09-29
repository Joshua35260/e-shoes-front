import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";

const SizeAdd = () => {
  const { handlePopUpAdd } = useContext(AdminContext);

  //pour changer les options//
  const [sizeName, setSizeName] = useState("");

  // message de validation //
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      size_name: sizeName,
    };
    axios.post(`http://localhost:5002/size/add`, data).then((res) => {
      console.warn(res);
      if (res.data.success === 1) {
        setIsSuccess({
          message: "Ajout de la taille validé",
        });
      } else {
        setIsSuccess({
          message: "Ajout de la taille refusé",
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
    <div className="admin">
      <p className="logout">Logout</p>

      <div className="adminRightBand addForm">
        <div className="modalBg" onClick={handlePopUpAdd}></div>
        <form className="adminForm" onSubmit={(e) => submit(e)}>
          <p className="adminTitle">Ajouter une taille</p>
          <div className="adminChamp">
            <label htmlFor="adminName">Taille</label>
            <input
              type="text"
              id="adminName"
              name="size_name"
              placeholder="Taille"
              onChange={(e) => setSizeName(e.target.value)}
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
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default SizeAdd;
