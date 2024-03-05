const TextInput = ({ onFocus, onBlur, name, label, type, placeholder, value, handleChange, style }) => {
    return (
        <div className="text-input">
            <p className="label">{label}</p>
            <input
                style={style}
                onFocus={onFocus}
                onBlur={onBlur}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
        </div>
    )
}

export default TextInput;
