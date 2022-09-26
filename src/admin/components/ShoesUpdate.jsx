import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AdminContext from "../contexts/AdminContext";

import axios from "axios";

const ShoesUpdate = () => {
  const { handlePopUpMod, modId } = useContext(AdminContext);

  const [shoesName, setShoesName] = useState("");

  const [shoesDescription, setShoesDescription] = useState("");
  const [shoesBrand, setShoesBrand] = useState("");
  const [shoesSize, setShoesSize] = useState("");
  const [shoesType, setShoesType] = useState("");
  const [shoesColor, setShoesColor] = useState("");
  const [shoesImage, setShoesImage] = useState({
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
    axios.get(`http://localhost:5002/shoes/${modId}`).then((res) => {
      setDefaultValue(res.data[0]);
      setShoesName(res.data[0].shoes_name);
      setShoesDescription(res.data[0].shoes_description);
      setShoesBrand(res.data[0].shoes_brand);
      setShoesSize(res.data[0].shoes_size);
      setShoesType(res.data[0].shoes_type);
      setShoesColor(res.data[0].shoes_color);
      setShoesImage({ ...shoesImage, filepreview: res.data[0].shoes_image });
    });
  }, []);
  const editImg = (event) => {
    setShoesImage({
      ...shoesImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    shoesBrand !== defaultValue.shoes_brand &&
      formdata.append("shoes_brand", shoesBrand);
    shoesColor !== defaultValue.shoes_color &&
      formdata.append("shoes_color", shoesColor);
    shoesName !== defaultValue.shoes_name &&
      formdata.append("shoes_name", shoesName);
    shoesDescription !== defaultValue.shoes_description &&
      formdata.append("shoes_description", shoesDescription);
    shoesImage.filepreview !== defaultValue.shoes_image &&
      formdata.append("shoes_image", shoesImage.file);
    shoesSize !== defaultValue.shoes_size &&
      formdata.append("shoes_size", shoesSize);
    shoesType !== defaultValue.shoes_type &&
      formdata.append("shoes_type", shoesType);

    axios
      .put(`http://localhost:5002/shoes/edit/${modId}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Modification de l'article validée",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Aucune modification appliquée à l'article",
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
            Modifier l'article' {defaultValue.shoes_name}
          </p>
          <div className="adminChamp">
            <label htmlFor="adminName">Nom de l'article </label>
            <input
              type="text"
              id="adminName"
              name="adminName"
              value={shoesName}
              onChange={(e) => setShoesName(e.target.value)}
            />
          </div>
          <div className="adminChamp" id="forLeft">
            <label htmlFor="adminImage">
              Image partenaire (format paysage)
            </label>
            <input type="file" name="shoes_image" onChange={editImg} />

            {shoesImage.filepreview !== null ? (
              <img
                className="adminImgApercu"
                src={
                  shoesImage.filepreview !== defaultValue.shoes_image
                    ? shoesImage.filepreview
                    : `http://localhost:5002/images/shoes/${shoesImage.filepreview}`
                }
                alt="UploadImage"
              />
            ) : null}
          </div>
          <div className="adminChamp">
            <label htmlFor="adminZipCode">Marque</label>
            <input
              type="number"
              id="adminBrand"
              name="adminBrand"
              value={shoesBrand}
              onChange={(e) => setShoesBrand(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminDescFR">Description</label>
            <textarea
              type="text"
              id="adminDesc"
              name="adminDesc"
              value={shoesDescription}
              onChange={(e) => setShoesDescription(e.target.value)}
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminCity">Taille</label>
            <input
              type="text"
              id="adminCity"
              name="adminCity"
              value={shoesSize}
              onChange={(e) => setShoesSize(e.target.value)}
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminLat">Couleur</label>
            <input
              type="text"
              id="adminColor"
              name="adminColor"
              value={shoesColor}
              onChange={(e) => setShoesColor(e.target.value)}
            />
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

export default ShoesUpdate;
