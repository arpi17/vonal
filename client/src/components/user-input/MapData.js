import React from 'react';
import uuidv4 from 'uuid/v4';

import InputField from './InputField';
import TextAreaField from './TextAreaField';
import RadioButtonArea from '../layout/RadioButtonArea';
import RadioButton from '../user-input/RadioButton';
import Button from '../buttons/Button';
import FlexContainer from '../layout/FlexContainer';
import Tag from '../cards/Tag';

// FIXME: Centering

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
          // label="Route Title"
          placeholder="Add title"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          error={errors.title}
        />
        <br />
        <TextAreaField
          // label="Description"
          placeholder="Add description"
          name="description"
          value={description}
          onChange={onChange}
          error={errors.description}
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
          <FlexContainer>
            {tags.map(tag => (
              <Tag key={uuidv4()}>
                {tag}{' '}
                <button type="button" onClick={() => deleteTagClick(tag)}>
                  &times;
                </button>
              </Tag>
            ))}
          </FlexContainer>
        </div>
        <br />
      </form>
      <Button onClick={createRouteClick} disabled={coords.length === 0} primary>
        Create route
      </Button>
    </div>
  );
}

export default MapData;
