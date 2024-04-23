import React, { useEffect } from "react";
import { SelectInput } from "../inputs/select-input";
import TextInput from "../inputs/text-input";

const DimentionSelector = ({ screenSize, active, next, form, handleChange }) => {

  useEffect(() => {
    if (active === "height") {
      const height = document.querySelector(".height-input")
      height?.focus();

    } else if (active === "length") {
      const length = document.querySelector(".length-input")
      length?.focus();
    }
  }, [active]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
      className={`
      ${next >= 8 ? "hidden" : ""}
      `}
    >
      {next >= 1 && (
        <div
          className={`${active === "select" || form.unit !== "" ? "active-inputs" : ""
            } tool-inputs-container tour`}
        >
          <p style={{ color: "#fff" }}>Measuring Unit:</p>
          <SelectInput
            autoOpen
            className="tool-inputs "
            name="unit"
            disabled={active !== "select"}
            value={form.unit}
            options={[
              { label: "cm", value: "cm" },
              { label: "inch", value: "inch" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" },
              { label: "ft", value: "ft" },
            ]}
            placeholder="Select Unit"
            handleChange={handleChange}
            header={true}
          />
          {screenSize !== "mobile" && active === "select" && (
            <div className="unit-selector animation">
              You can select the unit for measurement
            </div>
          )}
        </div>
      )}
      {next >= 3 && (
        <div
          className={`${active === "height" || form.length ? "active-inputs" : ""
            } tool-inputs-container tour`}
        >
          <p style={{ color: "#fff" }}>Height:</p>
          <TextInput
            disabled={active !== "height"}
            className="tool-inputs"
            inputClassname="height-input"
            name="length"
            value={form.length}
            type="number"
            placeholder="Enter"
            handleChange={handleChange}
          />
          {screenSize !== "mobile" && active === "height" && (
            <div className="dim-selector animation">
              Add height of red flashing line to proceed.
            </div>
          )}
        </div>
      )}
      {next >= 4 && (
        <div
          className={`${active === "length" || form.width ? "active-inputs" : ""
            } tool-inputs-container tour`}
        >
          <p style={{ color: "#fff" }}>Length:</p>
          <TextInput
            disabled={active !== "length"}
            className="tool-inputs "
            inputClassname="length-input"
            name="width"
            value={form.width}
            type="number"
            placeholder="Enter"
            handleChange={handleChange}
          />
          {screenSize !== "mobile" && active === "length" && (
            <div className="dim-selector animation">
              Add length of red flashing line to proceed.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DimentionSelector;
