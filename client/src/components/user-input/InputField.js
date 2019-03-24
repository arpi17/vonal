import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import InputFieldGroup from '../layout/InputFieldGroup';
import ErrorMsg from '../text/ErrorMsg';
import InputButtonContainer from '../layout/InputButtonContainer';
import InputButton from '../buttons/InputButton';

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
    onClick,
    error,
    width,
    withButton
  } = props;

  return (
    <InputFieldGroup>
      {/* <label> */}
      <label>{label}</label>
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
      {/* </label> */}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {withButton && (
        <InputButtonContainer>
          <InputButton onClick={onClick} type="button">
            &#43;
          </InputButton>
        </InputButtonContainer>
      )}
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
  onClick: PropTypes.func,
  error: PropTypes.string,
  width: PropTypes.string,
  withButton: PropTypes.bool
};

export default InputField;
