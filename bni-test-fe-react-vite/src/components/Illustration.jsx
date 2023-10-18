import React from "react";
import bniBanner from "../assets/img/bni_banner.jpg";

export const Illustration = () => {
  return (
    <div className="col-6">
      <img
        src={bniBanner}
        className="h-100 w-100"
        style={{ objectFit: "cover", maxHeight: "100vh" }}
      />
    </div>
  );
};
