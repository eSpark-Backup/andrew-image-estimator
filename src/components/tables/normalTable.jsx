const NormalTable = ({ calculation, form }) => {
    return (
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Total Value</td>
                </tr>
            </thead>
            <tr>
                <td>Size</td>
                <td>{Number(calculation.size).toFixed(2)} {form.unit === "cm" ? "Cm" : "In"}&#xb2;</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>{Number(calculation.weight).toFixed(2)} Lbs</td>
            </tr>
            <tr>
                <td>Total Price</td>
                <td>$ {Number(calculation.platePrice).toFixed(2)}</td>
            </tr>
        </table>
    )
}

export default NormalTable