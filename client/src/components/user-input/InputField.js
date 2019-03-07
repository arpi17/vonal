import React from 'react';
import PropTypes from 'prop-types';

function InputField({
  placeholder,
  label,
  name,
  type,
  checked,
  value,
  onChange
}) {
  return (
    <label>
      <div>{label}</div>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputField;
