import React from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';
import RadioButtonArea from '../layout/RadioButtonArea';
import RadioButton from '../user-input/RadioButton';

import uuidv4 from 'uuid/v4';

function MapData({
  title,
  description,
  currentTag,
  tags,
  type,
  coords,
  errors,
  onChange,
  addTagClick,
  deleteTagClick,
  createRouteClick
}) {
  return (
    <div>
      <form>
        <InputField
          label="Route Title"
          placeholder="Add title"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          error={errors.title}
        />
        <br />
        <TextAreaField
          label="Description"
          placeholder="Add description"
          name="description"
          value={description}
          onChange={onChange}
        />
        <br />
        <RadioButtonArea>
          <RadioButton
            label="Walking"
            type="radio"
            name="type"
            value="walking"
            checked={type === 'walking'}
            onChange={onChange}
          />
          <RadioButton
            label="Cycling"
            type="radio"
            name="type"
            value="cycling"
            checked={type === 'cycling'}
            onChange={onChange}
          />
        </RadioButtonArea>
        <div className="tag-area">
          <InputField
            placeholder="Add tags"
            type="text"
            name="currentTag"
            value={currentTag}
            onChange={onChange}
          />
          <button type="button" onClick={addTagClick}>
            Add Tag
          </button>
          <div className="tag-container">
            <ul>
              {tags.map(tag => (
                <li key={uuidv4()}>
                  {tag}{' '}
                  <button type="button" onClick={() => deleteTagClick(tag)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <br />
      </form>
      <button onClick={createRouteClick} disabled={coords.length === 0}>
        Create route
      </button>
    </div>
  );
}

export default MapData;
