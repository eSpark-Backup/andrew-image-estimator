import Select from 'react-select';
export const SelectInput = ({ disabled, className, name, value, label, options, placeholder, handleChange,header }) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: 26,
            minHeight: 10,
            fontSize: 15,
            // paddingTop:"0px !important",
            paddingBottom:"30px !important"
        }),
        input: (provided) => ({
            ...provided,
            height: 26,
            // marginBottom:"1px !important"
            // paddingTop:"0px !important"
        }),
    };
    return (
        <div className={`${className} select-input`}>
            {label && <p className="label">{label}</p>}
            <Select
                styles={header?customStyles:""}
                isDisabled={disabled}
                name={name}
                value={options.find(option => option.value === value)}
                onChange={(e) => handleChange(name, e.value)}
                options={options}
                placeholder={placeholder}
            />
        </div>
    )
}
