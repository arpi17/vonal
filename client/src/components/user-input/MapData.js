import React from 'react';
import uuidv4 from 'uuid/v4';

import FormContainer from '../layout/FormContainer';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import RadioButtonArea from '../layout/RadioButtonArea';
import RadioButton from '../user-input/RadioButton';
import Button from '../buttons/Button';
import FlexContainer from '../layout/FlexContainer';
import TagArea from '../layout/TagArea';
import Tag from '../cards/Tag';

// TODO: Add tag on enter press

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
  onKeyDown,
  createRouteClick
}) {
  return (
    <FormContainer>
      <form>
        <InputField
          placeholder="Add title"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          error={errors.title}
        />
        <TextAreaField
          placeholder="Add description"
          name="description"
          value={description}
          onChange={onChange}
          error={errors.description}
        />
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
        <TagArea>
          <InputField
            placeholder="Add tags"
            type="text"
            name="currentTag"
            value={currentTag}
            onChange={onChange}
            onClick={addTagClick}
            onKeyDown={onKeyDown}
            withButton={true}
          />
          <FlexContainer wrap>
            {tags.map(tag => (
              <Tag key={uuidv4()}>
                {tag}{' '}
                <button type="button" onClick={() => deleteTagClick(tag)}>
                  &times;
                </button>
              </Tag>
            ))}
          </FlexContainer>
        </TagArea>
      </form>
      <Button onClick={createRouteClick} disabled={coords.length === 0} primary>
        Create route
      </Button>
    </FormContainer>
  );
}

export default MapData;
