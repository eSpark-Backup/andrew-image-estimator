import { useEffect, useRef, useState } from 'react';
import { DustbinBlack, EditIcon, downArrow } from '../../assets';
import { useOutsideClick } from '../../algorithm';

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
  customizer,
  handleDelete,
  handleEdit,
  showActions,
  isForm,
  blinking,
  setCurrentFieldName,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (value === '' && !isForm) {
      setOpen(true);
    }
  }, [value]);
  const inputRef = useRef(null);
  useOutsideClick(inputRef, () => setOpen(false));
  return autoOpen ? (
    <>
      {label && <p className="label">{label}</p>}
      <div
        ref={inputRef}
        onClick={() => {
          !disabled && setOpen(!open);
        }}
        className={`autoOpenSelect ${customizer ? 'cDropdown' : ''} ${
          isForm ? 'w-350' : ''
        } ${blinking && 'blink-box-shadow'} ${
          disabled && 'disabled-input-field'
        }`}
      >
        <div>
          {typeof value === 'object' ? value?.label : value || placeholder}
        </div>
        <img src={downArrow} alt="arrow" />
        <div className={`options ${!open && 'd-none'}`}>
          {options.map((option, index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onClick={() =>
                  handleChange(name, isForm ? option : option.value)
                }
                key={index}
              >
                <div>{option.label}</div>
                <div>
                  {showActions && (
                    <img
                      onClick={() => handleEdit(option)}
                      className="dropdown-trash"
                      src={EditIcon}
                      alt="add"
                    />
                  )}
                  {showActions && (
                    <img
                      onClick={() => handleDelete(option)}
                      className="dropdown-trash"
                      src={DustbinBlack}
                      alt="add"
                    />
                  )}
                </div>
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
        onFocus={() => setCurrentFieldName(name)}
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
