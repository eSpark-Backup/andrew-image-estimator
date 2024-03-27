const NormalTable = ({ item, form, calculation, token }) => {
  console.log(calculation, "calculation");
  return (
    <>
      {token ? (
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
                  {Number(item?.wear_plate_area).toFixed(2)} {form.unit}&#xb2;
                </div>
              </li>
              <li className="table-row">
                <div className="col col-1">Weight</div>
                <div className="col col-2">
                  {Number(item?.wear_plate_weight).toFixed(2)} Lbs
                </div>
              </li>
              <li className="table-footer">
                <div className="col col-1">Total Price</div>
                <div className="col col-2">
                  $ {Number(item.plate_price).toFixed(2)}
                </div>
              </li>
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
                  {Number(calculation?.weight).toFixed(4)} Lbs
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
      )}
    </>
  );
};

export default NormalTable;
