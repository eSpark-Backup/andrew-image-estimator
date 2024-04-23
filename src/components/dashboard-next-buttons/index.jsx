import React from 'react';
import {
  calculateFabrication,
  handleCalculate,
  hasNoFalsyValue,
} from '../../algorithm';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../constants';

const DashboardNextButtons = ({
  fetchCurrentEstimation,
  apiPolygons,
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
  setModal,
}) => {
  const authToken = window.localStorage.getItem('token');
  const handleClickPrev = () => {
    if (next === 0) {
      alert('first');
      return false;
    } else if (next === 9) {
      setNext((ps) => ps - 2);
      setPolygonInd((ps) => ps - 1);
    } else {
      setNext((ps) => ps - 1);
    }
  };
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     padding: '25px 0px',
    //   }}
    // >
    <motion.div
      key={next}
      {...slideAnimation('right')}
      className="button-container"
      // style={{
      //   display: 'flex',
      //   justifyContent: 'space-between',
      //   width: '100%',
      //   padding: '25px 20px 0 0',
      //   flexWrap:"wrap"
      // }}
    >
      <div className='left-button'>
        {next >= 1 && (
          <button
            onClick={handleClickPrev}
            className={`${!canvasImage && next === 0 ? 'hidden' : ''}`}
          >
            Prev
          </button>
        )}
      </div>
      <div style={{position: "relative"}} className='table-buttons'>
        {((!loader && next === 0 && canvasImage) ||
          (next === 1 && form.unit) ||
          (next === 2 && crop.width > 0) ||
          (next === 3 && form.length > 0) ||
          (next === 4 && form.width > 0) ||
          (next === 5 &&
            points.length > 1 &&
            points[0]?.x === points[points.length - 1]?.x &&
            points[0]?.y === points[points.length - 1]?.y) ||
          (next === 6 &&
            (points.length >= 1 ||
              childPoints.length >= 1 ||
              childPoints[0]?.x === childPoints[childPoints.length - 1]?.x)) ||
          (next === 7 && form.fabricator)) && (
            <div className="next-submit-button animation">
              {
                next === 0 ?
                  "Please Submit the selected Image to Proceed" :
                  next === 1 ?
                    "Please Submit the selected Unit to Proceed" :
                    next === 2 ?
                      "Please Submit Cropped Image to Proceed" :
                      next === 3 ?
                        "Please Submit the Height  to Proceed" :
                        next === 4 ?
                          "Please Submit the Length to Proceed" :
                          next === 5 ?
                            "Please Submit the Points to Proceed" :
                            next === 6 ?
                              "Please Submit the Points to Proceed" :
                              next === 7 ?
                                "Please Submit the Fabricator to Proceed" :
                                next === 9 ?
                                  "Please Submit the Fabrication Details to Proceed" :

                                  "Please Click Next to Proceed"

              }
            </div>
          )}
        {(next <= 10 || (form.fabricator && next === 9)) && (
          <button
            disabled={
              loader ||
              (next === 0 && !canvasImage) ||
              (next === 1 && form.unit === '') ||
              (next === 2 && crop.width === 0) ||
              (next === 3 && form.length === '') ||
              (next === 4 && form.width === '') ||
              (next === 5 &&
                (points.length <= 1 ||
                  points[0]?.x !== points[points.length - 1]?.x)) ||
              (next === 6 &&
                (childPoints.length <= 1 ||
                  childPoints[0]?.x !==
                  childPoints[childPoints.length - 1]?.x)) ||
              (next === 7 && form.fabricator === '') ||
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
                  apiPolygons,
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
                  setNext,
                  setLoader
                );
              } else if (next === 8) {
                if (!form.fabricator || form?.fabricator === 'false') {
                  setNext(10);
                } else {
                  setNext(9);
                }
              } else if (next === 9) {
                if (form?.fabricator === 'false' && !authToken) {
                  setNext(10);
                } else {
                  calculateFabrication(
                    calculation,
                    setCalculation,
                    dropdowns,
                    setCalArr,
                    polygonsInd,
                    setNext,
                    apiPolygons,
                    token,
                    id,
                    calArr,
                    polygonArr,
                    form,
                    setLoader
                  );
                }
              } else {
                fetchCurrentEstimation();
                setNext(6);
                setDropdowns({
                  perimeterWelding: false,
                  stitchWelding: false,
                  fastening: '',
                  brakeBends: '',
                  rolledBends: '',
                  sunkBoltsHoles: '',
                  plateType: '',
                  deliveryDate: '',
                  plateTypeUsed: '',
                  abrasionType: '',
                  impactType: '',
                  dtsDate: '',
                  zipCode: '',
                });
              }
            }}
            className={`
            ${(next === 5 &&
                !(points.length <= 1 ||
                  points[0]?.x !== points[points.length - 1]?.x)
                )
                ? "blink-box-shadow" 
                : ""
              }
            ${(next === 6 &&
                !(childPoints.length <= 1 ||
                  childPoints[0]?.x !== childPoints[childPoints.length - 1]?.x)
                )
                ? "blink-box-shadow"
                : ""
              }
            ${!canvasImage && next === 0 ? 'hidden' : ''}`}
          >
            {loader ? (
              <div className="button-loader">
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            ) : next > 9 ? (
              'Need more polygons'
            ) : next === 0 ||
              next === 1 ||
              next === 4 ||
              next === 6 ||
              next === 7 ||
              next === 9 ? (
              'Submit'
            ) : (
              'Next'
            )}
          </button>
        )}
        {next > 9 && (
          <button onClick={() => setModal(authToken ? 'auth' : 'unAuth')}>
            Share via email
          </button>
        )}
      </div>
    </motion.div>
    // </div>
  );
};

export default DashboardNextButtons;
