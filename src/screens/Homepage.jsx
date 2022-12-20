import React from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <Slider />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
