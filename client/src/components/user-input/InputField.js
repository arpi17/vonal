import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputFieldGroup, ErrorMsg } from '../../styles/FormFields';

function InputField(props) {
  const {
    placeholder,
    label,
    name,
    type,
    checked,
    value,
    onChange,
    error
  } = props;

  const errorMessage = <ErrorMsg>{error}</ErrorMsg>;

  return (
    <InputFieldGroup>
      <label>
        <div>{label}</div>
        <Input
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          checked={checked}
          onChange={onChange}
          error={error}
        />
      </label>
      {error && errorMessage}
    </InputFieldGroup>
  );
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default InputField;
