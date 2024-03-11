export const SelectInput = ({ disabled, className, name, value, label, options, placeholder, handleChange }) => {
    return (
        <div className={`${className} select-input`}>
            {label && <p className="label">{label}</p>}
            <select disabled={disabled} name={name} value={value} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                <option value="" disabled selected hidden>{placeholder}</option>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}><div className="options">{option.label}</div></option>
                })}
            </select>
        </div >
    )
}