import React, { useState } from "react";
import {
  changeImage,
  changeImageWhite,
  resetImg,
  resetImgWhite,
  revertImg,
  revertImgWhite,
} from "../../assets";

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
  points,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (name) => {
    setShowTooltip(name);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="button-container topBtns">
      {canvasImage && next === 0 ? (
        <div
          className="tooltip"
          onMouseEnter={() => handleMouseEnter("change")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="cursor-pointer undo"
            src={showTooltip === "change" ? changeImageWhite : changeImage}
            alt="change"
            onClick={handleRemoveImage}
          />
        </div>
      ) : next === 2 && crop.width !== 0 ? (
        <div
          className="tooltip tooltipReset"
          onMouseEnter={() => handleMouseEnter("reset")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="cursor-pointer undo"
            src={showTooltip === "reset" ? resetImgWhite : resetImg}
            alt="change"
            onClick={resetShape}
          />
        </div>
      ) : next === 5 && points.length > 0 ? (
        <div className="button-container">
          <div
            className="tooltip tooltipReset"
            onMouseEnter={() => handleMouseEnter("reset")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="cursor-pointer undo"
              src={showTooltip === "reset" ? resetImgWhite : resetImg}
              alt="change"
              onClick={handleReset}
            />
          </div>
          <div
            className="tooltip tooltipRevert"
            onMouseEnter={() => handleMouseEnter("revert")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="cursor-pointer undo"
              src={showTooltip === "revert" ? revertImgWhite : revertImg}
              alt="change"
              onClick={handleRevert}
            />
          </div>
        </div>
      ) : next === 6 && childPoints.length > 0 ? (
        <div className="button-container">
          <div
            className="tooltip tooltipReset"
            onMouseEnter={() => handleMouseEnter("reset")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="cursor-pointer undo"
              src={showTooltip === "reset" ? resetImgWhite : resetImg}
              alt="change"
              onClick={handleResetChild}
            />
          </div>
          <div
            className="tooltip tooltipRevert"
            onMouseEnter={() => handleMouseEnter("revert")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="cursor-pointer undo"
              src={showTooltip === "revert" ? revertImgWhite : revertImg}
              alt="change"
              onClick={handleRevertChild}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopButtons;
