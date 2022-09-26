import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AdminContext from "../contexts/AdminContext";

import axios from "axios";

const ShoesAdd = () => {
  const { handlePopUpAdd } = useContext(AdminContext);

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
    setShoesImage({
      ...shoesImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log({
      shoesName,
      shoes_image: shoesImage.file ? true : false,
      shoesDescription,
      shoesType,
      shoesBrand,
      shoesColor,
      shoesSize,
      success:
        shoesName &&
        shoesImage.file &&
        shoesBrand &&
        shoesColor &&
        shoesDescription &&
        shoesType &&
        shoesSize
          ? true
          : false,
    });
    if (
      shoesName &&
      shoesImage.file &&
      shoesBrand &&
      shoesColor &&
      shoesDescription &&
      shoesType
    ) {
      const formdata = new FormData();
      formdata.append("shoes_brand", shoesBrand);
      formdata.append("shoes_color", shoesColor);
      formdata.append("shoes_name", shoesName);
      formdata.append("shoes_description", shoesDescription);
      formdata.append("shoes_brand", shoesBrand);
      formdata.append("shoes_image", shoesImage.file);
      formdata.append("shoes_size", shoesSize);

      axios
        .post(`http://localhost:5002/shoes/add`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.warn(res);
          if (res.data.success === 1) {
            setIsSuccess({
              message: "Ajout de l'article validé",
              uploadOk: res.data.success,
            });
          } else {
            setIsSuccess({
              message: "Ajout de l'article refusé",
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
          <p className="adminTitle">Ajouter un article</p>
          <div className="adminChamp">
            <label htmlFor="adminName">Nom de l'article</label>
            <input
              type="text"
              id="adminName"
              name="shoes_image"
              placeholder="Nom du partenaire"
              onChange={(e) => setShoesName(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp" id="forLeft">
            <label htmlFor="adminImage">
              Image de l'article (format paysage)
            </label>
            <input type="file" name="shoes_image" onChange={editImg} required />
            {shoesImage.filepreview !== null ? (
              <img
                className="adminImgApercu"
                src={shoesImage.filepreview}
                alt="UploadImage"
              />
            ) : null}
          </div>
          <div className="adminChamp">
            <label htmlFor="adminDesc">Description</label>
            <textarea
              type="text"
              id="adminDesc"
              name="adminDesc"
              placeholder="Ajouter une description"
              onChange={(e) => setShoesDescription(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminShoes">Marque</label>
            <input
              type="text"
              id="adminShoes"
              name="adminShoes"
              placeholder="Marque"
              onChange={(e) => setShoesBrand(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminSize">Size</label>
            <input
              type="number"
              id="adminSize"
              name="adminSize"
              placeholder="43"
              onChange={(e) => setShoesSize(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminColor">Couleur</label>
            <input
              type="text"
              id="adminColor"
              name="adminColor"
              placeholder="bleu"
              onChange={(e) => setShoesColor(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp">
            <label htmlFor="adminDesc">Style</label>
            <textarea
              type="text"
              id="adminStyle"
              name="adminStyle"
              placeholder="Ajouter le style"
              onChange={(e) => setShoesType(e.target.value)}
              required
            />
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

export default ShoesAdd;
