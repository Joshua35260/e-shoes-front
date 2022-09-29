import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";

const BrandAdd = () => {
  const { handlePopUpAdd } = useContext(AdminContext);

  //pour changer les options//
  const [brandName, setBrandName] = useState("");

  const [brandLogo, setBrandLogo] = useState({
    file: "",
    filepreview: null,
  });

  // message de validation //
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(null);
  const styles = {
    isUpload: {
      color: isSuccess?.uploadOk ? "rgb(30, 211, 45)" : "rgb(255, 71, 71)",
      textAlign: "center",
      border: "1px solid white",
      borderRadius: "8px",
      backgroundColor: "rgb(66, 66, 61, 0.5)",
      padding: "0.5em 0",
      margin: "1.5em 0 0 0",
    },
  };

  const editImg = (event) => {
    setBrandLogo({
      ...brandLogo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log({
      brandName,
      brand_logo: brandLogo.file ? true : false,
      success: brandName && brandLogo.file ? true : false,
    });
    if (brandName && brandLogo.file) {
      const formdata = new FormData();
      formdata.append("brand_name", brandName);
      formdata.append("brand_logo", brandLogo.file);

      axios
        .post(`http://localhost:5002/brand/add`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.warn(res);
          if (res.data.success === 1) {
            setIsSuccess({
              message: "Ajout de la marque validé",
              uploadOk: res.data.success,
            });
          } else {
            setIsSuccess({
              message: "Ajout de la marque refusé",
              uploadOk: res.data.success,
            });
          }
        });
    }
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
          <p className="adminTitle">Ajouter une marque</p>
          <div className="adminChamp">
            <label htmlFor="adminName">Nom de la marque</label>
            <input
              type="text"
              id="adminName"
              name="brand_name"
              placeholder="Nom de la marque"
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp" id="forLeft">
            <label htmlFor="adminImage">Logo de la marque</label>
            <input type="file" name="brand_logo" onChange={editImg} required />
            {brandLogo.filepreview !== null ? (
              <img
                className="adminImgApercu"
                src={brandLogo.filepreview}
                alt="UploadImage"
              />
            ) : null}
          </div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
          <button className="adminFormButton" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandAdd;
