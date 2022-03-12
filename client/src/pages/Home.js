import React from "react";
import Footer from "../components/home/footer";
import HomeItems from "../components/home/HomeItems";
import TopBanner from "../components/home/TopBanner";

const Home = () => {
  return (
    <React.Fragment>
      <div className="bg-white">
        <TopBanner />
        <HomeItems />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
