import React from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="homepageContainer">
        <div className="homepage">coucou</div>
        <Slider />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
