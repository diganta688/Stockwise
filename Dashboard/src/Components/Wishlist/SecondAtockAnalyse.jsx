import * as React from "react";

export default function SecondAtockAnalyse({ stockInfo }) {
  return (
    <>
      <iframe
      className="iframe"
        referrerPolicy="origin"
        width="100%"
        height="470"
        style={{
          background: "#FFFFFF",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
        }}
        src={`https://jika.io/embed/area-chart?symbol=${stockInfo.name}&selection=all&closeKey=close&boxShadow=true&graphColor=1652f0&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito`}
      />
    </>
  );
}
