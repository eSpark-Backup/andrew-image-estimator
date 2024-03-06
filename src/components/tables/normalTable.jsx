const NormalTable = ({ calculation, form }) => {
  return (
    <>
      <br />
      <div className="table-box">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">Total Value</div>
          </li>
          <li className="table-row">
            <div className="col col-1">Size</div>
            <div className="col col-2">
              {Number(calculation.size).toFixed(2)} {form.unit}&#xb2;
            </div>
          </li>
          <li className="table-row">
            <div className="col col-1">Weight</div>
            <div className="col col-2">
              {Number(calculation?.weight).toFixed(2)} Lbs
            </div>
          </li>
          <li className="table-row">
            <div className="col col-1">Total Price</div>
            <div className="col col-2">
              $ {Number(calculation.platePrice).toFixed(2)}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NormalTable;
