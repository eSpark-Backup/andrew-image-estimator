import React from "react";
const FabricationTable = ({ item, form }) => {
  return (
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
            <div className="col col-2">{item?.wear_plate_type_est}</div>
            <div className="col col-3">-</div>
            <div className="col col-4">-</div>
          </li>
          <li className="table-row">
            <div className="col col-1">Wear Plate Area</div>
            <div className="col col-2">-</div>
            <div className="col col-3">-</div>
            <div className="col col-4">
              {Number(item?.wear_plate_area).toFixed(2)} {form?.unit}&#xb2;
            </div>
          </li>
          <li className="table-row">
            <div className="col col-1">Wear Plate Weight</div>
            <div className="col col-2">-</div>
            <div className="col col-3">-</div>
            <div className="col col-4">
              {Number(item?.wear_plate_weight).toFixed(2)} Lbs
            </div>
          </li>
          <li className="table-row">
            <div className="col col-1">Plate Price</div>
            <div className="col col-2">-</div>
            <div className="col col-3">-</div>
            <div className="col col-4">
              $ {Number(item?.plate_price).toFixed(2)}
            </div>
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
            <div className="col col-1">Type of wear Plate Used Currently</div>
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
          </li>
          <li className="table-row">
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
          </li>
          <li className="table-footer">
            <div className="col col-1">Total Price</div>
            <div className="col col-2"></div>
            <div className="col col-3"></div>
            <div className="col col-4">
              $ {Number(item?.total_price).toFixed(2)}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default FabricationTable;
