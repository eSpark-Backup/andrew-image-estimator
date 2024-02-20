const FabricationTable = ({ calculation, form, dropdowns }) => {
    return (
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Inputs</td>
                    <td>Price</td>
                    <td>Total Value</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Wear Plate Type for Estimate</td>
                    <td>{dropdowns.plateType}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Wear Plate Area</td>
                    <td></td>
                    <td></td>
                    <td>{Number(calculation.size).toFixed(2)} {form.unit === "cm" ? "Cm" : "In"}&#xb2;</td>
                </tr>
                <tr>
                    <td>Wear Plate Weight</td>
                    <td></td>
                    <td></td>
                    <td>{Number(calculation.weight).toFixed(2)} Lbs</td>
                </tr>
                <tr>
                    <td>Plate Price</td>
                    <td></td>
                    <td></td>
                    <td>$ {Number(calculation.platePrice).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Estimated Delivery Date</td>
                    <td>{dropdowns.deliveryDate} {dropdowns.deliveryDate === "1" ? "Week" : "Weeks"}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Type of wear Plate Used Currently</td>
                    <td>{dropdowns.plateTypeUsed}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Perimeter Welding</td>
                    <td>{dropdowns?.perimeterWelding && dropdowns?.perimeterWelding === "true" ? "Yes" : "No"}</td>
                    <td>$ 0.20 / Weight</td>
                    <td>$ {Number(calculation.perimeterWelding).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Stitch Welding</td>
                    <td>{dropdowns?.stitchWelding && dropdowns?.stitchWelding === "true" ? "Yes" : "No"}</td>
                    <td>$ 0.30 / Weight</td>
                    <td>$ {Number(calculation.stitchWelding).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Fastening using Studs</td>
                    <td>{dropdowns?.fastening}</td>
                    <td>$ 1.50 / Weight</td>
                    <td>$ {Number(calculation.fastening).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Brake Bends</td>
                    <td>{dropdowns?.brakeBends}</td>
                    <td>$ 0.60 / Weight</td>
                    <td>$ {Number(calculation.brakeBends).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Rolled Bends</td>
                    <td>{dropdowns?.rolledBends}</td>
                    <td>$ 0.60 / Weight</td>
                    <td>$ {Number(calculation.rolledBends).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Sunk Bolts Holes</td>
                    <td>{dropdowns?.sunkBoltsHoles}</td>
                    <td>$ 0.35 / Weight</td>
                    <td>$ {Number(calculation.sunkBoltsHoles).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Abrasion Type</td>
                    <td>{dropdowns?.abrasionType}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Impact Type</td>
                    <td>{dropdowns?.impactType}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Delivery to Site Date</td>
                    <td>{dropdowns?.dtsDate}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Zip Code</td>
                    <td>{dropdowns?.zipCode}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total Price</td>
                    <td></td>
                    <td></td>
                    <td><b>$ {Number(calculation.totalPrice).toFixed(2)}</b></td>
                </tr>
            </tbody>
        </table>
    )
}

export default FabricationTable