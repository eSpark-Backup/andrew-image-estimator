const TextInput = ({
  disabled,
  className,
  onFocus,
  onBlur,
  name,
  label,
  type,
  placeholder,
  value,
  handleChange,
  style,
  blinking,
  max,
  inputClassname,
}) => {
  const handleChangeInput = (event) => {
    const value = event.target.value;

    // Filter out non-numeric characters
    const numericValue = value.replace(/[^\d.]/g, '');

    // Call the handleChange function passed as a prop
    if (type === 'number') {
      handleChange(name, numericValue, type);
    } else {
      handleChange(name, value, type);
    }
  };
  return (
    <div className={`${className} text-input`}>
      {label && <p className="label">{label}</p>}
      <input
        id={disabled && 'disabled-input-field'}
        className={`${[
          blinking && 'blink-box-shadow',
          disabled && 'disabled-input-field',
        ].join(' ')} ${inputClassname}`
        }
        style={style}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        type={type === 'number' ? 'text' : type}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        onChange={(e) => handleChangeInput(e)}
      />
    </div>
  );
};

export default TextInput;
