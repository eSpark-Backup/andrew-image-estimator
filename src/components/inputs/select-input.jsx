import { useEffect, useRef, useState } from "react";
import { downArrow } from "../../assets";
import { useOutsideClick } from "../../algorithm";

export const SelectInput = ({
  autoOpen,
  disabled,
  className,
  name,
  value,
  label,
  options,
  placeholder,
  handleChange,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(value === ""){
        setOpen(true)
    }
  },[value])
  const inputRef = useRef(null);
  useOutsideClick(inputRef, () => setOpen(false));
  return autoOpen ? (
    <>
      <div
        ref={inputRef}
        onClick={() => {
          !disabled && setOpen(!open);
        }}
        className="autoOpenSelect"
      >
        <div>{value || placeholder}</div>
        <img src={downArrow} alt="arrow" />
        <div className={`options ${!open && "d-none"}`}>
          {options.map((option, index) => {
            return (
              <div onClick={() => handleChange(name, option.value)} key={index}>
                {option.label}
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className={`${className} select-input`}>
      {label && <p className="label">{label}</p>}
      <select
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              <div className="options">{option.label}</div>
            </option>
          );
        })}
      </select>
    </div>
  );
};
