import React from 'react';

import InputField from './InputField';

function MapData({ title, description, onChange }) {
  return (
    <div>
      <form>
        <InputField
          placeholder="Title of the route"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
        <br />
        <InputField
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default MapData;
