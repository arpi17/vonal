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
import TagDeleteButton from '../buttons/TagDeleteButton';

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
  sendRouteClick,
  _id
}) {
  const buttonText = _id ? 'Update route' : 'Create route';
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
          <FlexContainer wrap="true">
            {tags.map(tag => (
              <Tag key={uuidv4()}>
                {tag}{' '}
                <TagDeleteButton
                  type="button"
                  onClick={() => deleteTagClick(tag)}
                >
                  &times;
                </TagDeleteButton>
              </Tag>
            ))}
          </FlexContainer>
        </TagArea>
      </form>
      <Button
        onClick={sendRouteClick}
        disabled={coords.length === 0}
        primary
        centered
        auto
      >
        {buttonText}
      </Button>
    </FormContainer>
  );
}

export default MapData;
