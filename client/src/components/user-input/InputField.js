import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import InputFieldGroup from '../layout/InputFieldGroup';
import ErrorMsg from '../text/ErrorMsg';

function InputField(props) {
  const {
    placeholder,
    label,
    name,
    type,
    checked,
    value,
    onChange,
    onBlur,
    error,
    width
  } = props;

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
          onBlur={onBlur}
          error={error}
          width={width}
        />
      </label>
      {error && <ErrorMsg>{error}</ErrorMsg>}
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
  onBlur: PropTypes.func,
  error: PropTypes.string,
  width: PropTypes.string
};

export default InputField;
