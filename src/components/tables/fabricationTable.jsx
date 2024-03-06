import React from 'react'
const FabricationTable = ({ calculation, form, dropdowns }) => {
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
                        <div className="col col-1" >Wear Plate Type for Estimate</div>
                        <div className="col col-2" >{dropdowns?.plateType}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Wear Plate Area</div>
                        <div className="col col-2" >-</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >{Number(calculation?.size).toFixed(2)} {form?.unit === "cm" ? "Cm" : "In"}&#xb2;</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Wear Plate Weight</div>
                        <div className="col col-2" >-</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >{Number(calculation?.weight).toFixed(2)} Lbs</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Plate Price</div>
                        <div className="col col-2" >-</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >$ {Number(calculation?.platePrice).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Estimated Delivery Date</div>
                        <div className="col col-2" >{dropdowns?.deliveryDate} {dropdowns?.deliveryDate === "1" ? "Week" : "Weeks"}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Type of wear Plate Used Currently</div>
                        <div className="col col-2" >{dropdowns?.plateTypeUsed}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Perimeter Welding</div>
                        <div className="col col-2" >{dropdowns?.perimeterWelding && dropdowns?.perimeterWelding === "true" ? "Yes" : "No"}</div>
                        <div className="col col-3" >$ 0.20 / Weight</div>
                        <div className="col col-4" >$ {Number(calculation?.perimeterWelding).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Stitch Welding</div>
                        <div className="col col-2" >{dropdowns?.stitchWelding && dropdowns?.stitchWelding === "true" ? "Yes" : "No"}</div>
                        <div className="col col-3" >$ 0.30 / Weight</div>
                        <div className="col col-4" >$ {Number(calculation?.stitchWelding).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Fastening using Studs</div>
                        <div className="col col-2" >{dropdowns?.fastening}</div>
                        <div className="col col-3" >$ 1.50 / Weight</div>
                        <div className="col col-4" >$ {Number(calculation?.fastening).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Brake Bends</div>
                        <div className="col col-2" >{dropdowns?.rolledBends}</div>
                        <div className="col col-3" >$ 0.60 / Weight</div>
                        <div className="col col-4" >$ {Number(calculation?.rolledBends).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Sunk Bolts Holes</div>
                        <div className="col col-2" >{dropdowns?.sunkBoltsHoles}</div>
                        <div className="col col-3" >$ 0.35 / Weight</div>
                        <div className="col col-4" >$ {Number(calculation?.sunkBoltsHoles).toFixed(2)}</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Abrasion Type</div>
                        <div className="col col-2" >{dropdowns?.abrasionType}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Impact Type</div>
                        <div className="col col-2" >{dropdowns?.impactType}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Delivery to Site Date</div>
                        <div className="col col-2" >{dropdowns?.dtsDate}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" >Zip Code</div>
                        <div className="col col-2" >{dropdowns?.zipCode}</div>
                        <div className="col col-3" >-</div>
                        <div className="col col-4" >-</div>
                    </li>
                    <li className="table-footer">
                        <div className="col col-1">Total Price</div>
                        <div className="col col-2"></div>
                        <div className="col col-3"></div>
                        <div className="col col-4">$ {Number(calculation?.totalPrice).toFixed(2)}</div>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default FabricationTable