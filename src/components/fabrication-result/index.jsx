import React from "react";
import NormalTable from "../tables/normalTable";
import FabricationTable from "../tables/fabricationTable";

const Result = ({ calArr, form }) => {
  return (
    <div style={{ width: "100%" }}>
      {calArr.length > 0
        ? calArr.map((item, index) => {
            return (
              <div
                style={{ width: "100%" }}
                key={item.polygonsInd}
                className="image-dropdown"
              >
                {
                  <div
                    style={{
                      height:
                        calArr.length === 1 &&
                        !Object.keys(item).includes("dropdowns")
                          ? "590px"
                          : Object.keys(item).includes("dropdowns")
                          ? "1635px"
                          : "440px",
                      borderRadius:
                        calArr.length === 1
                          ? "10px 0 0 10px"
                          : calArr.length > 1 && index === 0
                          ? "10px 0 0 0"
                          : calArr.length > 1 && index === calArr.length - 1
                          ? "0 0 0 10px"
                          : "0",
                    }}
                    className="img"
                  >
                    <div className={index === 0 && "head"}>
                      <img
                        style={{
                          width: `${item?.dimention?.width}px`,
                          height: `${item?.dimention?.height}px`,
                          zIndex: -9,
                        }}
                        src={item?.image}
                      />
                    </div>
                  </div>
                }
                <div style={{ width: "85%", padding: "20px 0" }}>
                  {index === 0 && (
                    <div className="details">
                      <p className="details-heading">Estimations</p>
                      <p style={{ width: "auto" }} className="details-desc">
                        Here is the estimations of the object you have selected
                      </p>
                    </div>
                  )}
                  {Object.keys(item).includes("dropdowns") ? (
                    <FabricationTable
                      calculation={item?.calculation}
                      form={form}
                      dropdowns={item?.dropdowns}
                    />
                  ) : (
                    <NormalTable calculation={item?.calculation} form={form} />
                  )}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Result;
