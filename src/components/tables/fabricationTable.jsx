import React from "react";
const FabricationTable = ({ item, form, calculation, dropdowns, token }) => {
  return (
    <>
      {token ? (
        <>
          <br />
          <div className="table-box">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Name</div>
                <div className="col col-2">Input</div>
                <div className="col col-3">Price</div>
                <div className="col col-4">Total Value</div>
              </li>
              {/* <li className="table-row">
                <div className="col col-1">Wear Plate Area</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">
                  {Number(27.86).toFixed(2)} {form?.unit}&#xb2;
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Wear Plate Weight</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">{Number(1.56).toFixed(2)} Lbs</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Plate Price</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">$ {Number(0.78).toFixed(2)}</div>
              </li> */}

              {
                item?.map((item, index) => {
                  // check item.selectedOption is not a number and not a boolean
                  return (
                  <li
                    key={index}
                    className={
                      item?.label === "Total Price"
                        ? "table-footer"
                        : "table-row"
                    }
                  >
                    <div className="col col-1">{item?.label}</div>
                    <div className="col col-2">
                      {item?.selectedOption === true 
                        ? "Yes"
                        : item?.selectedOption === false
                        ? "No"
                        : item?.selectedOption}
                    </div>
                    <div className="col col-3">
                      {/* now there muliply the item.selectedOption with price and then divite it with price   */}
                      {item.label === "Perimeter Welding" ?
                      `$ 0.2/ Weight`
                      : item.label === "Stitch Welding" ?
                      `$ 0.3/ Weight`
                      : item.price
                        ? item.price === "-"
                          ? "-"
                          : typeof item?.selectedOption === "number"
                          ? `$ ${Number(item?.price).toFixed(2)}/ Weight`
                          : item?.selectedOption === true || item?.selectedOption === false
                          ? "-"
                          : `$ ${Number(item?.price).toFixed(2)}`
                        : "-"}
                    </div>
                    <div className="col col-4">
                      {
                      item.totalPrice ?
                        `$ ${Number(item.totalPrice).toFixed(2)}`
                        : item.price
                        ? typeof item?.selectedOption === "number"
                          ? `$ ${Number(
                              item?.selectedOption * item?.price
                            ).toFixed(2)}`
                          : item?.selectedOption === true || item?.selectedOption === false
                          ? "-"
                          : `$ ${Number(item?.price).toFixed(2)}`
                        : "-"
                        }
                    </div>
                  </li>
                );
              })}
              {/* <li className="table-footer">
                <div className="col col-1">Total Price</div>
                <div className="col col-2"></div>
                <div className="col col-3"></div>
                <div className="col col-4">-
                  {/* $ {
                    item?.reduce((acc, item) => {
                      if (item.price) {
                        if (typeof item?.selectedOption === "number") {
                          return acc + item?.selectedOption * item?.price;
                        } else {
                          return acc + item?.price;
                        }
                      } else {
                        return acc;
                      }
                    }, 0).toFixed(2)
                  }
                </div>
              </li>



              {/* <li className="table-row">
                <div className="col col-1">Wear Plate Type for Estimate</div>
                <div className="col col-2">{item?.wear_plate_type_est}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>

              <li className="table-row">
                <div className="col col-1">Estimated Delivery Date</div>
                <div className="col col-2">
                  {item?.est_delivery_date}{" "}
                  {item?.est_delivery_date === "1" ? "Week" : "Weeks"}
                </div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">
                  Type of wear Plate Used Currently
                </div>
                <div className="col col-2">{item?.wear_plate_type_curr}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Perimeter Welding</div>
                <div className="col col-2">
                  {item?.perimeter_welding || item?.perimeter_welding === "true"
                    ? "Yes"
                    : "No"}
                </div>
                <div className="col col-3">$ 0.20 / Weight</div>
                <div className="col col-4">
                  ${" "}
                  {item?.perimeter_welding || item?.perimeter_welding === "true"
                    ? (Number(item.wear_plate_weight) * 0.2).toFixed(2)
                    : 0}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Stitch Welding</div>
                <div className="col col-2">
                  {item?.stich_welding || item?.stich_welding === "true"
                    ? "Yes"
                    : "No"}
                </div>
                <div className="col col-3">$ 0.30 / Weight</div>
                <div className="col col-4">
                  ${" "}
                  {item?.stich_welding || item?.stich_welding === "true"
                    ? (Number(item.wear_plate_weight) * 0.3).toFixed(2)
                    : 0}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Fastening using Studs</div>
                <div className="col col-2">{item?.fasten_use_studs}</div>
                <div className="col col-3">$ 1.50 / Weight</div>
                <div className="col col-4">
                  $ {(Number(item?.fasten_use_studs) * 1.5).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Roll Bends</div>
                <div className="col col-2">{item?.roll_bends}</div>
                <div className="col col-3">$ 0.60 / Weight</div>
                <div className="col col-4">
                  $ {(Number(item?.roll_bends) * 0.6).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Brake Bends</div>
                <div className="col col-2">{item?.press_break_bends}</div>
                <div className="col col-3">$ 0.60 / Weight</div>
                <div className="col col-4">
                  $ {(Number(item?.press_break_bends) * 0.6).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Sunk Bolts Holes</div>
                <div className="col col-2">{item?.bolt_holes}</div>
                <div className="col col-3">$ 0.35 / Weight</div>
                <div className="col col-4">
                  $ {(Number(item?.bolt_holes) * 0.35).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Abrasion Type</div>
                <div className="col col-2">{item?.abrasion_type}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Impact Type</div>
                <div className="col col-2">{item?.impact_type}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li> */}
              {/* <li className="table-row">
                <div className="col col-1">Delivery to Site Date</div>
                <div className="col col-2">{item?.deliver_site_date}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Zip Code</div>
                <div className="col col-2">{item?.zip_code}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li> */}

            </ul>
          </div>
        </>
      ) : (
        <>
          <br />
          <div className="table-box">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Name</div>
                <div className="col col-2">Input</div>
                <div className="col col-3">Price</div>
                <div className="col col-4">Total Value</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Wear Plate Type for Estimate</div>
                <div className="col col-2">{dropdowns?.plateType}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Wear Plate Area</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">
                  {Number(calculation?.size).toFixed(2)} {form?.unit}&#xb2;
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Wear Plate Weight</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">
                  {Number(calculation?.weight).toFixed(2)} Lbs
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Plate Price</div>
                <div className="col col-2">-</div>
                <div className="col col-3">-</div>
                <div className="col col-4">
                  $ {Number(calculation?.platePrice).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Estimated Delivery Date</div>
                <div className="col col-2">
                  {dropdowns?.deliveryDate}{" "}
                  {dropdowns?.deliveryDate === "1" ? "Week" : "Weeks"}
                </div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">
                  Type of wear Plate Used Currently
                </div>
                <div className="col col-2">{dropdowns?.plateTypeUsed}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Perimeter Welding</div>
                <div className="col col-2">
                  {dropdowns?.perimeterWelding &&
                    dropdowns?.perimeterWelding === "true"
                    ? "Yes"
                    : "No"}
                </div>
                <div className="col col-3">$ 0.20 / Weight</div>
                <div className="col col-4">
                  $ {Number(calculation?.perimeterWelding).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Stitch Welding</div>
                <div className="col col-2">
                  {dropdowns?.stitchWelding &&
                    dropdowns?.stitchWelding === "true"
                    ? "Yes"
                    : "No"}
                </div>
                <div className="col col-3">$ 0.30 / Weight</div>
                <div className="col col-4">
                  $ {Number(calculation?.stitchWelding).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Fastening using Studs</div>
                <div className="col col-2">{dropdowns?.fastening}</div>
                <div className="col col-3">$ 1.50 / Weight</div>
                <div className="col col-4">
                  $ {Number(calculation?.fastening).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Brake Bends</div>
                <div className="col col-2">{dropdowns?.rolledBends}</div>
                <div className="col col-3">$ 0.60 / Weight</div>
                <div className="col col-4">
                  $ {Number(calculation?.rolledBends).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Sunk Bolts Holes</div>
                <div className="col col-2">{dropdowns?.sunkBoltsHoles}</div>
                <div className="col col-3">$ 0.35 / Weight</div>
                <div className="col col-4">
                  $ {Number(calculation?.sunkBoltsHoles).toFixed(2)}
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Abrasion Type</div>
                <div className="col col-2">{dropdowns?.abrasionType}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Impact Type</div>
                <div className="col col-2">{dropdowns?.impactType}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Delivery to Site Date</div>
                <div className="col col-2">{dropdowns?.dtsDate}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Zip Code</div>
                <div className="col col-2">{dropdowns?.zipCode}</div>
                <div className="col col-3">-</div>
                <div className="col col-4">-</div>
              </li>
              <li className="table-footer">
                <div className="col col-1">Total Price</div>
                <div className="col col-2"></div>
                <div className="col col-3"></div>
                <div className="col col-4">
                  $ {Number(calculation?.totalPrice).toFixed(2)}
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
export default FabricationTable;
