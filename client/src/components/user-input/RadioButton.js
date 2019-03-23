import React from 'react';
import PropTypes from 'prop-types';

function RadioButton({ label, name, value, checked, onChange, onBlur }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

export default RadioButton;
