import React from "react";
import { changeImage, resetImg, revertImg } from "../../assets";

const TopButtons = ({
  canvasImage,
  next,
  handleRemoveImage,
  crop,
  resetShape,
  handleReset,
  handleRevert,
  childPoints,
  handleResetChild,
  handleRevertChild,
  points
}) => {
  return (
    <div className="button-container topBtns">
      {canvasImage && next === 0 ? (
        <img
          className="cursor-pointer"
          src={changeImage}
          alt="change"
          onClick={handleRemoveImage}
        />
      ) : next === 2 && crop.width !== 0 ? (
        <img
          className="cursor-pointer"
          src={resetImg}
          alt="change"
          onClick={resetShape}
        />
      ) : next === 5 && points.length > 0 ? (
        <div className="button-container">
          <img
            className="cursor-pointer"
            src={resetImg}
            alt="change"
            onClick={handleReset}
          />
          <img
            className="cursor-pointer"
            src={revertImg}
            alt="change"
            onClick={handleRevert}
          />
        </div>
      ) : next === 6 && childPoints.length > 0 ? (
        <div className="button-container">
          <img
            className="cursor-pointer"
            src={resetImg}
            alt="change"
            onClick={handleResetChild}
          />
          <img
            className="cursor-pointer"
            src={revertImg}
            alt="change"
            onClick={handleRevertChild}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TopButtons;
