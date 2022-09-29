import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import axios from "axios";

const BrandUpdate = () => {
  const { handlePopUpMod, modId } = useContext(AdminContext);

  const [brandName, setBrandName] = useState("");
  const [brandLogo, setBrandLogo] = useState({
    file: "",
    filepreview: null,
  });

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

  //stockage donnée placeholder//
  const [defaultValue, setDefaultValue] = useState({});

  //charge données pour le placeholder//
  useEffect(() => {
    axios.get(`http://localhost:5002/brand/${modId}`).then((res) => {
      setDefaultValue(res.data[0]);
      setBrandName(res.data[0].brand_name);
      setBrandLogo({ ...brandLogo, filepreview: res.data[0].brand_logo });
    });
  }, []);
  const editImg = (event) => {
    setBrandLogo({
      ...brandLogo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    brandName !== defaultValue.brand_name &&
      formdata.append("brand_name", brandName);
    brandLogo.filepreview !== defaultValue.brand_logo &&
      formdata.append("brand_logo", brandLogo.file);

    axios
      .put(`http://localhost:5002/brand/edit/${modId}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Modification de la marque validée",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Aucune modification appliquée à la marque",
            uploadOk: res.data.success,
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
      <div className="adminRightBand addForm">
        <div className="modalBg" onClick={handlePopUpMod}></div>
        <form className="adminForm" onSubmit={(e) => submit(e)}>
          <p className="adminTitle">
            Modifier la marque {defaultValue.brand_name}
          </p>
          <div className="adminChamp">
            <label htmlFor="adminName">Nom de la marque</label>
            <input
              type="text"
              id="adminName"
              name="adminName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className="adminChamp" id="forLeft">
            <label htmlFor="adminImage">Logo de la marque</label>
            <input type="file" name="brand_logo" onChange={editImg} />

            {brandLogo.filepreview !== null ? (
              <img
                className="adminImgApercu"
                src={
                  brandLogo.filepreview !== defaultValue.brand_logo
                    ? brandLogo.filepreview
                    : `http://localhost:5002/images/brand/${brandLogo.filepreview}`
                }
                alt="UploadImage"
              />
            ) : null}
          </div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
          <button className="adminFormButton" type="submit">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandUpdate;
