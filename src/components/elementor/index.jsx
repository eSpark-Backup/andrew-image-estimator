import { SelectInput } from "../inputs/select-input"
import TextInput from "../inputs/text-input"

const Elementor = ({ form, handleChange, handleSubmit, disabled, cropImage, handleParentCalculate, handleChildCalculate, next, setNext }) => {

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
      {next === 0 ?
        <>
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
          <button disabled={disabled} className="button" onClick={() => {
            cropImage()
            setNext(1)
          }}>Crop Object</button>
        </>
        : next === 1 ?
          <>
            <button className="button" onClick={handleParentCalculate}>Calculate Object</button>
            <button className="button" onClick={() => setNext(2)}>Go for inside Object</button>
          </>
          : next === 2 ?
            <>
              <button disabled={disabled} className="button" onClick={handleSubmit}>Crop inside Object</button>
            </>
            :
            <>
              <button disabled={disabled} className="button" onClick={handleChildCalculate}>Calculate inside Object</button>
            </>
      }
    </div>
  )
}

export default Elementor