export const SelectInput = ({ name, value, label, options, placeholder, handleChange }) => {
    return (
        <div className="select-input">
            <p className="label">{label}</p>
            <select name={name} value={value} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                <option value="" disabled selected hidden>{placeholder}</option>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.label}</option>
                })}
            </select>
        </div >
    )
}
