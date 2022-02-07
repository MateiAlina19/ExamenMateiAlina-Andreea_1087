import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const favouriteListForm = () => {
    navigate("/favouriteList");
  };

  const videoForm = () => {
    navigate("/video");
  };

  return (
    <div className="home">
      <div className="div1">
        <button className="button" onClick={favouriteListForm}>
          Favourite List
        </button>
      </div>
      <div className="div1">
        <button className="button" onClick={videoForm}>
          Videos
        </button>
      </div>
    </div>
  );
};
