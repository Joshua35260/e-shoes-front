import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { Slide } from "@mui/material";

const Slider = () => {
  const [currentSlide, setCurrenteSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/shoes`)
      .then((res) => setSliderData(res.data));
  }, []);

  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrenteSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrenteSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function autoSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrenteSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      autoSlide();
    }
    return () => clearInterval(slideInterval);
  }, [autoScroll, autoSlide, currentSlide, slideInterval]);

  return (
    <div className="slider">
      <AiOutlineLeft className="arrow-slider prev" onClick={prevSlide} />
      <AiOutlineRight className="arrow-slider next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        return (
          <div
            className={
              index === currentSlide ? "slide-slider current" : "slide-slider"
            }
            key={index}
          >
            {index === currentSlide && (
              <div>
                <Link to={`/article/${slide.id}`}>
                  <img
                    className="img-slider"
                    src={`http://localhost:5002/images/shoes/${slide.shoes_img}`}
                    alt="slide"
                  />
                </Link>
                {slide.shoes_name}
                {slide.shoes_size}
                {slide.shoes_color}
                {slide.shoes_description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
