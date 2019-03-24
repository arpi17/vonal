import React from 'react';
import PropTypes from 'prop-types';

import TextArea from './TextArea';
import ErrorMsg from '../text/ErrorMsg';

function TextAreaField({ placeholder, name, label, value, onChange, error }) {
  return (
    <label>
      <div>{label}</div>
      <TextArea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        // cols="30"
        // rows="10"
      />
      <ErrorMsg>{error}</ErrorMsg>
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
