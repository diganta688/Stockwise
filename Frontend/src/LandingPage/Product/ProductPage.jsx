import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  let LeftData = {
    image: [
      "media/Images/kite.png",
      "media/Images/coin.png",
      "media/Images/varsity.png",
    ],
    Title: ["kite", "Coin", "Varsity mobile"],
    description: [
      "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.",
      "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",
      "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.",
    ],
    googlePlayIcon: "media/Images/googlePlayBadge.svg",
    applePlayIcon: "media/Images/appstoreBadge.svg",
  };
  let RightData = {
    image: ["media/Images/console.png", "media/Images/kiteconnect.png"],
    Title: ["Console", "Kite Connect API"],
    description: [
      "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.",
      "The central dashboard for your TradeSphere account. Gain insights into your trades and investments with in-depth reports and visualisations.",
    ],
  };
  return (
    <>
      <Hero />
      <LeftSection
        image={LeftData.image[0]}
        platformName={LeftData.Title[0]}
        description={LeftData.description[0]}
        gplayIcon={LeftData.googlePlayIcon}
        appleplayIcon={LeftData.applePlayIcon}
      />
      <RightSection image={RightData.image[0]}
        platformName={RightData.Title[0]}
        description={RightData.description[0]}/>
      <LeftSection
        image={LeftData.image[1]}
        platformName={LeftData.Title[1]}
        description={LeftData.description[1]}
        gplayIcon={LeftData.googlePlayIcon}
        appleplayIcon={LeftData.applePlayIcon}
      />
      <RightSection image={RightData.image[1]}
        platformName={RightData.Title[1]}
        description={RightData.description[1]}/>
      <LeftSection
        image={LeftData.image[2]}
        platformName={LeftData.Title[2]}
        description={LeftData.description[2]}
        gplayIcon={LeftData.googlePlayIcon}
        appleplayIcon={LeftData.applePlayIcon}
      />
      <Universe />
    </>
  );
}

export default ProductPage;
