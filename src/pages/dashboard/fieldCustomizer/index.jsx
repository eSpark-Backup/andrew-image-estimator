import React, { useState } from "react";
import { SelectInput } from "../../../components";
import { add } from "../../../assets";
import ModalComponent from "../../../components/modal/Modal";

const FieldCustomizer = () => {

  let weakOptions = [];
for (let i = 1; i <= 25; i++) {
  weakOptions.push({
    label: `${i} ${i === 1 ? "Week" : "Weeks"}`,
    value: i.toString(),
  });
}
weakOptions.push({ label: `upto 25 Weeks`, value: "25+" });

const [open, setOpen] = useState(false)
const [fields, setFields] = useState([
  {
    id: 1,
    label: "Wear Plate Type for Estimate",
    options: [
      { label: "AR plate", value: "AR" },
      { label: "CCO plate", value: "CCO" },
    ],
    placeholder: "Wear Plate Type for Estimate",
    name: "plateType",
  },
  {
    id: 2,
    label: "Estimated Delivery Date",
    options: weakOptions,
    placeholder: "Estimated Delivery Date",
    name: "deliveryDate",
  },
]);

const handleDelete = (option, id) => {
  const newArr = fields.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        options: item.options.filter((item) => item.value !== option.value),
      };
    } else {
      return { ...item };
    }
  });
  setFields(newArr)
};

const handleAddField = (value) => {
  const newArr = fields.map((item) => {
    if (item.id === open) {
      return {
        ...item,
        options: [...item.options, {label: value, value}],
      };
    } else {
      return { ...item };
    }
  });
  setFields(newArr)
  setOpen(false)
}

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {fields.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div onClick={() => setOpen(item.id)} className="add">
              <img src={add} alt="add" />
            </div>
            <div style={{ width: "calc(100% - 60px)" }} key={item.id}>
              <p style={{ marginBottom: "5px" }}>{item.label}:</p>
              <SelectInput
                autoOpen
                customizer
                name={item.name}
                // value={form.unit}
                options={item.options}
                placeholder={item.placeholder}
                handleDelete={(option) =>
                  handleDelete(option, item.id)
                }
                handleChange={() => console.log("change")}
              />
            </div>
          </div>
        );
      })}
      <ModalComponent
        heading={"Add"}
        label={
          `add fields to your dropdown`
        }
        placeholder={"Enter value"}
        btn1Text={"Cancel"}
        btn2Text={"Add"}
        closeModal={() => setOpen(false)}
        modalIsOpen={open}
        onSuccess={handleAddField}
      />
    </div>
  );
};

export default FieldCustomizer;
