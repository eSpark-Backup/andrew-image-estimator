import React from "react";
import { SelectInput } from "../inputs/select-input";
import TextInput from "../inputs/text-input";
import { useNavigate } from "react-router";

const ToolHeader = ({ active, form, handleChange }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "62px",
        background: "#303032",
        padding: "10px 30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <p style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>Logo</p>
        <p
          onClick={() => navigate("/")}
          style={{
            fontSize: "18px",
            fontWeight: 400,
            color: "#fff",
            cursor: "pointer",
            lineHeight: "10px",
          }}
        >
          Back to Dashboard
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          className={`${
            active === "select" || form.unit !== "" ? "active-inputs" : ""
          } tool-inputs-container`}
        >
          <p style={{ color: "#fff" }}>Measuring Unit:</p>
          <SelectInput
            className="tool-inputs"
            name="unit"
            disabled={active !== "select"}
            value={form.unit}
            options={[
              {label: "cm", value: "cm" },
              {label: "inch", value: "inch" },
              {label: "m", value: "m" },
              {label: "mm", value: "mm" },
              {label: "ft", value: "ft" },
            ]}
            placeholder="Select Unit"
            handleChange={handleChange}
          />
        </div>
        <div
          className={`${
            active === "height" || form.length ? "active-inputs" : ""
          } tool-inputs-container`}
        >
          <p style={{ color: "#fff" }}>Height:</p>
          <TextInput
            disabled={active !== "height"}
            className="tool-inputs"
            name="length"
            value={form.length}
            type="number"
            placeholder="Enter"
            handleChange={handleChange}
          />
        </div>
        <div
          className={`${
            active === "length" || form.width ? "active-inputs" : ""
          } tool-inputs-container`}
        >
          <p style={{ color: "#fff" }}>Length:</p>
          <TextInput
            disabled={active !== "length"}
            className="tool-inputs"
            name="width"
            value={form.width}
            type="number"
            placeholder="Enter"
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolHeader;
