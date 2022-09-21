import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [sliderData, setSliderData] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5002/shoes/`)
      .then((res) => setSliderData(res.data));
  }, []);
  return (
    <Slider {...settings}>
      <div>
        <h3>
          <Link to={`/shoes/${id}`}>
            <img
              className="img-slider"
              src={`http://localhost:5002/shoes/${sliderData.shoes_img}`}
              alt="slide"
            />
          </Link>
        </h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}
