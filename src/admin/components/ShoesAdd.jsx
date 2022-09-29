import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import TypesOptions from "./TypeOptions";
import BrandsOptions from "./BrandOptions";
import SizesOptions from "./SizeOptions";
import ColorsOptions from "./ColorOptions";

import axios from "axios";

const ShoesAdd = () => {
  const { handlePopUpAdd } = useContext(AdminContext);

  //pour changer les options//
  const [shoesName, setShoesName] = useState("");

  const [shoesDescription, setShoesDescription] = useState("");
  const [shoesImage, setShoesImage] = useState({
    file: "",
    filepreview: null,
  });
  const [shoesBrand, setShoesBrand] = useState("");
  const [shoesSize, setShoesSize] = useState("");
  const [shoesType, setShoesType] = useState("");
  const [shoesColor, setShoesColor] = useState("");
  //pour charger les menus déroulants//
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [type, setType] = useState([]);
  const [color, setColor] = useState([]);
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

  // pour le map des menus déroulants//
  useEffect(() => {
    axios
      .get(`http://localhost:5002/color/colorsNames`)
      .then((res) => setColor(res.data));
    console.log("color", color);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/type/typesNames`)
      .then((res) => setType(res.data));
    console.log("style", type);
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
      shoesDescription,
      shoes_img: shoesImage.file ? true : false,
      shoesBrand,
      shoesSize,
      shoesType,
      shoesColor,
      success:
        shoesName &&
        shoesDescription &&
        shoesImage.file &&
        shoesBrand &&
        shoesSize &&
        shoesType &&
        shoesColor
          ? true
          : false,
    });
    if (
      shoesName &&
      shoesDescription &&
      shoesImage.file &&
      shoesBrand &&
      shoesSize &&
      shoesType &&
      shoesColor
    ) {
      const formdata = new FormData();
      formdata.append("shoes_name", shoesName);
      formdata.append("shoes_description", shoesDescription);
      formdata.append("shoes_img", shoesImage.file);
      formdata.append("brand_id", shoesBrand);
      formdata.append("size_id", shoesSize);
      formdata.append("type_id", shoesType);
      formdata.append("color_id", shoesColor);

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
              name="shoes_img"
              placeholder="Nom de l'article"
              onChange={(e) => setShoesName(e.target.value)}
              required
            />
          </div>
          <div className="adminChamp" id="forLeft">
            <label htmlFor="adminImage">Image de l'article</label>
            <input type="file" name="shoes_img" onChange={editImg} required />
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
            <select
              className="adminSelect"
              onChange={(e) => setShoesBrand(e.target.value)}
              required
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
            <label htmlFor="adminSize">Size</label>
            <select
              className="adminSelect"
              onChange={(e) => setShoesSize(e.target.value)}
              required
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
              required
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
          <div className="adminChamp">
            <label htmlFor="adminDesc">Style</label>
            <select
              className="adminSelect"
              onChange={(e) => setShoesType(e.target.value)}
              required
            >
              <option className="adminOption" value="...">
                ...
              </option>
              {type.map((type) => (
                <TypesOptions
                  typeName={type.type_name}
                  Tid={type.id}
                  key={type.id}
                />
              ))}
            </select>
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
