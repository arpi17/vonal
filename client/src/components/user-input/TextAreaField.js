import React from 'react';
import PropTypes from 'prop-types';

function TextAreaField({ placeholder, name, label, value, onChange }) {
  return (
    <label>
      <div>{label}</div>
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        cols="30"
        rows="10"
      />
    </label>
  );
}

TextAreaField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
