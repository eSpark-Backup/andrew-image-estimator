import React from "react";
import {
  calculateFabrication,
  handleCalculate,
  hasNoFalsyValue,
} from "../../algorithm";

const DashboardNextButtons = ({
  token,
  id,
  calArr,
  cutImg,
  next,
  setNext,
  form,
  canvasImage,
  crop,
  points,
  childPoints,
  dropdowns,
  setDropdowns,
  handleCrop,
  handleCutout,
  handleInsideCutout,
  calculation,
  polygonArr,
  polygonsInd,
  insideCutImg,
  setCalculation,
  setCalArr,
  setPolygonArr,
  setPolygonInd,
  loader,
  setLoader,
}) => {
  return (
    <div className="button-container right">
      {(next <= 10 || (form.fabricator && next === 9)) && (
        <button
          disabled={
            loader ||
            (next === 0 && !canvasImage) ||
            (next === 1 && form.unit === "") ||
            (next === 2 && crop.width === 0) ||
            (next === 3 && form.length === "") ||
            (next === 4 && form.width === "") ||
            (next === 5 &&
              (points.length <= 1 ||
                points[0]?.x !== points[points.length - 1]?.x)) ||
            (next === 6 &&
              (childPoints.length <= 1 ||
                childPoints[0]?.x !==
                  childPoints[childPoints.length - 1]?.x)) ||
            (next === 7 && form.fabricator === "") ||
            (next === 9 && !hasNoFalsyValue(dropdowns))
          }
          onClick={() => {
            if (next === 0) {
              setNext(1);
            } else if (next === 1) {
              setNext(2);
            } else if (next === 2) {
              setNext(3);
            } else if (next === 3) {
              setNext(4);
            } else if (next === 4) {
              handleCrop();
            } else if (next === 5) {
              handleCutout();
            } else if (next === 6) {
              handleInsideCutout();
            } else if (next === 7) {
              handleCalculate(
                token,
                id,
                calArr,
                form,
                cutImg,
                polygonArr,
                polygonsInd,
                insideCutImg,
                setCalculation,
                setCalArr,
                setPolygonArr,
                setPolygonInd,
                setNext
              );
            } else if (next === 8) {
              if (!form.fabricator || form?.fabricator === "false") {
                setNext(10);
              } else {
                setNext(9);
              }
            } else if (next === 9) {
              if (form?.fabricator === "false") {
                setNext(10);
              } else {
                calculateFabrication(
                  calculation,
                  setCalculation,
                  dropdowns,
                  setCalArr,
                  polygonsInd,
                  setNext
                );
              }
            } else {
              setNext(6);
              setDropdowns({
                perimeterWelding: false,
                stitchWelding: false,
                fastening: "",
                brakeBends: "",
                rolledBends: "",
                sunkBoltsHoles: "",
                plateType: "",
                deliveryDate: "",
                plateTypeUsed: "",
                abrasionType: "",
                impactType: "",
                dtsDate: "",
                zipCode: "",
              });
            }
          }}
        >
          {loader ? (
            <div className="button-loader">
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </div>
          ) : next > 9 ? (
            "Need more polygons"
          ) : (
            "Next"
          )}
        </button>
      )}
      {next > 9 && <button>Share via email</button>}
    </div>
  );
};

export default DashboardNextButtons;
