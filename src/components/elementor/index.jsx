import { SelectInput } from "../inputs/select-input"
import TextInput from "../inputs/text-input"

const Elementor = ({ form, handleChange, handleSubmit, disabled }) => {

  const thicknessOptions = [
    { label: "5 mm", value: 5 },
    { label: "10 mm", value: 10 },
    { label: "15 mm", value: 15 },
    { label: "20 mm", value: 20 },
    { label: "25 mm", value: 25 },
    { label: "30 mm", value: 30 },
    { label: "35 mm", value: 35 },
    { label: "40 mm", value: 40 },
    { label: "45 mm", value: 45 },
    { label: "50 mm", value: 50 },
  ]

  return (
    <div className="sidebar">
      <div className="Logo">Image Estimator</div>
      <SelectInput
        name="unit"
        value={form.unit}
        label="Select Your Measuring Scale"
        options={[{ label: "Inches (inch)", value: "inch" }, { label: "Centimeter (sm)", value: "cm" }]}
        placeholder="Select Unit"
        handleChange={handleChange}
      />
      <TextInput
        name="length"
        value={form.length}
        label="Length"
        type="number"
        placeholder="Enter the length of your object"
        handleChange={handleChange}
      />
      <TextInput
        name="width"
        value={form.width}
        label="Width"
        type="number"
        placeholder="Enter the width of your object"
        handleChange={handleChange}
      />
      <SelectInput
        name="thickness"
        value={form.thickness}
        label="Thickness of Plates (mm)"
        options={thicknessOptions}
        placeholder="Select thickness"
        handleChange={handleChange}
      />
      <TextInput
        name="density"
        value={form.density}
        label="Steel density"
        type="number"
        placeholder="Enter the density of your object"
        handleChange={handleChange}
      />
      <button disabled={disabled} className="button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Elementor