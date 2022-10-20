import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import BrandsOptions from "./BrandOptions";
import SizesOptions from "./SizeOptions";
import ColorsOptions from "./ColorOptions";

import axios from "axios";

const ShoesUpdate = () => {
  const { handlePopUpMod, modId } = useContext(AdminContext);

  const [shoesName, setShoesName] = useState("");

  const [shoesDescription, setShoesDescription] = useState("");
  const [shoesBrand, setShoesBrand] = useState("");
  const [shoesSize, setShoesSize] = useState("");
  const [shoesColor, setShoesColor] = useState("");
  const [shoesImage, setShoesImage] = useState({
    file: "",
    filepreview: null,
  });

  //pour charger les menus déroulants//
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

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
      setShoesBrand(res.data[0].brand_id);
      setShoesSize(res.data[0].size_id);
      setShoesColor(res.data[0].color_id);
      setShoesImage({ ...shoesImage, filepreview: res.data[0].shoes_img });
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

  // pour le map des menus déroulants//
  useEffect(() => {
    axios
      .get(`http://localhost:5002/color/colorsNames`)
      .then((res) => setColor(res.data));
    console.log("color", color);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/size/sizes`)
      .then((res) => setSize(res.data));
    console.log("size", size);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/brand/brandsNames`)
      .then((res) => setBrand(res.data));
    console.log("marque", brand);
  }, []);
  const submit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    shoesName !== defaultValue.shoes_name &&
      formdata.append("shoes_name", shoesName);
    shoesDescription !== defaultValue.shoes_description &&
      formdata.append("shoes_description", shoesDescription);
    shoesImage.filepreview !== defaultValue.shoes_img &&
      formdata.append("shoes_img", shoesImage.file);
    shoesBrand !== defaultValue.brand_id &&
      formdata.append("brand_id", shoesBrand);
    shoesSize !== defaultValue.size_id && formdata.append("size_id", shoesSize);
    shoesColor !== defaultValue.color_id &&
      formdata.append("color_id", shoesColor);

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
            <label htmlFor="adminImage">Image de l'article</label>
            <input type="file" name="shoes_img" onChange={editImg} />

            {shoesImage.filepreview !== null ? (
              <img
                className="adminImgApercu"
                src={
                  shoesImage.filepreview !== defaultValue.shoes_img
                    ? shoesImage.filepreview
                    : `http://localhost:5002/images/shoes/${shoesImage.filepreview}`
                }
                alt="UploadImage"
              />
            ) : null}
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
            <label htmlFor="adminShoes">Marque</label>
            <select
              className="adminSelect"
              onChange={(e) => setShoesBrand(e.target.value)}
              value={shoesBrand}
            >
              <option className="adminOption" value="...">
                ...
              </option>
              {brand.map((brand) => (
                <BrandsOptions
                  brandName={brand.brand_name}
                  Bid={brand.id}
                  key={brand.id}
                />
              ))}
            </select>
          </div>
          <div className="adminChamp">
            <label htmlFor="adminSize">Taille</label>
            <select
              className="adminSelect"
              onChange={(e) => setShoesSize(e.target.value)}
              value={shoesSize}
            >
              <option className="adminOption" value="...">
                ...
              </option>
              {size.map((size) => (
                <SizesOptions
                  sizeName={size.size_name}
                  Sid={size.id}
                  key={size.id}
                />
              ))}
            </select>
          </div>
          <div className="adminChamp">
            <label htmlFor="adminColor">couleur</label>
            <select
              className="adminSelect"
              onChange={(e) => setShoesColor(e.target.value)}
              value={shoesColor}
            >
              <option className="adminOption" value="...">
                ...
              </option>
              {color.map((color) => (
                <ColorsOptions
                  colorName={color.color_name}
                  Cid={color.id}
                  key={color.id}
                />
              ))}
            </select>
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
