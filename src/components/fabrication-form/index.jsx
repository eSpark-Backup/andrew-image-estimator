import React from "react";
import { SelectInput } from "../inputs/select-input";
import TextInput from "../inputs/text-input";

const FabForm = ({
  insideCutImg,
  insideChildCroppedImage,
  dropdowns,
  handleDropdowns,
  form,
  handleChange,
}) => {
  let options = [];
  for (let i = 0; i <= 50; i++) {
    options.push({ label: i.toString(), value: i });
  }

  let weakOptions = [];
  for (let i = 1; i <= 25; i++) {
    weakOptions.push({
      label: `${i} ${i === 1 ? "Week" : "Weeks"}`,
      value: i.toString(),
    });
  }
  weakOptions.push({ label: `upto 25 Weeks`, value: "25+" });

  return (
    <div className="image-dropdown">
      {
        <div className="img head">
          <img
            style={{
              width: `${insideCutImg.width}px`,
              height: `${insideCutImg.height}px`,
              zIndex: -9,
            }}
            src={insideChildCroppedImage}
          />
        </div>
      }
      <div style={{ width: "100%" }}>
        <div className="details">
          <p className="details-heading">Details</p>
          <p style={{ width: "auto" }} className="details-desc">
            Kindly provide the following details to get the estimation of your
            object.
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%" }} className="dropdown">
            <div>
              <SelectInput
                name="plateType"
                value={dropdowns.plateType}
                label="Wear Plate Type for Estimate"
                options={[
                  { label: "AR plate", value: "AR" },
                  { label: "CCO plate", value: "CCO" },
                ]}
                placeholder="Select Wear Plate Type for Estimate"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="deliveryDate"
                value={dropdowns.deliveryDate}
                label="Estimated Delivery Date"
                options={weakOptions}
                placeholder="Select Estimated Delivery Date"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="plateTypeUsed"
                value={dropdowns.plateTypeUsed}
                label="Type of wear Plate Used Currently"
                options={[
                  { label: "QT plate", value: "QT" },
                  { label: "AR plate", value: "AR" },
                  { label: "Weld Overlay", value: "weld" },
                  { label: "Others", value: "others" },
                ]}
                placeholder="Select Type of wear Plate Used Currently"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="perimeterWelding"
                value={dropdowns.perimeterWelding}
                label="Perimeter Welding"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select Perimeter Welding"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="stitchWelding"
                value={dropdowns.stitchWelding}
                label="Stitch Welding"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select Stitch Welding"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="fastening"
                value={dropdowns.fastening}
                label="Fastening using Studs"
                options={options}
                placeholder="Select Fastening"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="brakeBends"
                value={dropdowns.brakeBends}
                label="How many Press Brake Bends to bend the radius"
                options={options}
                placeholder="Select Brake Bends"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="rolledBends"
                value={dropdowns.rolledBends}
                label="How many Rolled Bends"
                options={options}
                placeholder="Select Rolled Bends"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="sunkBoltsHoles"
                value={dropdowns.sunkBoltsHoles}
                label="How Many Counter Sunk Bolts Holes"
                options={options}
                placeholder="Select Sunk Bolts Holes"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="abrasionType"
                value={dropdowns.abrasionType}
                label="Abrasion Type"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Heavy", value: "heavy" },
                  { label: "Medium", value: "medium" },
                ]}
                placeholder="Select Abrasion Type"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="impactType"
                value={dropdowns.impactType}
                label="Impact Type"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Heavy", value: "heavy" },
                  { label: "Medium", value: "medium" },
                ]}
                placeholder="Select Impact Type"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <SelectInput
                name="fabricator"
                value={form.fabricator}
                label="Calculate Estimate with Fabrication Services"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select"
                handleChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                name="zipCode"
                value={dropdowns.zipCode}
                label="Zip Code"
                type="number"
                placeholder="Enter Zip Code"
                handleChange={handleDropdowns}
              />
            </div>
            <div>
              <TextInput
                name="dtsDate"
                value={dropdowns.dtsDate}
                label="Delivery to Site Date"
                type="text"
                placeholder="Enter Delivery to Site Date"
                handleChange={handleDropdowns}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabForm;
