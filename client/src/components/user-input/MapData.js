import React from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

function MapData({
  title,
  description,
  currentTag,
  tags,
  type,
  onChange,
  addTagClick,
  deleteTagClick,
  drawRouteClick
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
                <li key={tag.id}>
                  {tag.name}{' '}
                  <button type="button" onClick={() => deleteTagClick(tag.id)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <br />
        <div className="radio-area">
          <InputField
            label="Walking"
            type="radio"
            name="type"
            value="walking"
            checked={type === 'walking'}
            onChange={onChange}
          />
          <InputField
            label="Cycling"
            type="radio"
            name="type"
            value="cycling"
            checked={type === 'cycling'}
            onChange={onChange}
          />
        </div>
      </form>
      <button onClick={drawRouteClick}>Connect the dots</button>
      <button disabled={true}>Create route</button>
    </div>
  );
}

export default MapData;
