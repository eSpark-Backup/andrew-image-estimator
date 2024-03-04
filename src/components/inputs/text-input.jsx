const TextInput = ({ onFocus, onBlur, name, label, type, placeholder, value, handleChange, style, error }) => {
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
            {error && <p className="error" style={{color:"red", fontSize:"12px", marginTop:"2px"}}>{error}</p>}
        </div>
    )
}

export default TextInput;
