import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../user-input/InputField';
import RadioButton from '../user-input/RadioButton';
import RadioButtonArea from '../layout/RadioButtonArea';
import Button from '../buttons/Button';

function Filter({ country, city, type, onChange, onBlur, onClick }) {
  return (
    <form>
      <InputField
        type="text"
        name="country"
        value={country}
        placeholder="Country"
        onChange={onChange}
        onBlur={onBlur}
        width="250px"
      />
      <InputField
        type="text"
        name="city"
        value={city}
        placeholder="City"
        onChange={onChange}
        onBlur={onBlur}
        width="250px"
      />
      <RadioButtonArea>
        <RadioButton
          label="All"
          name="type"
          value=""
          checked={!type}
          onChange={onChange}
          onBlur={onBlur}
        />
        <RadioButton
          label="Walking"
          name="type"
          value="walking"
          checked={type === 'walking'}
          onChange={onChange}
          onBlur={onBlur}
        />
        <RadioButton
          label="Cycling"
          name="type"
          value="cycling"
          checked={type === 'cycling'}
          onChange={onChange}
          onBlur={onBlur}
        />
      </RadioButtonArea>
      <Button onClick={onClick} type="button" primary>
        Get Routes
      </Button>
    </form>
  );
}

Filter.propTypes = {
  country: PropTypes.string,
  city: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default Filter;
