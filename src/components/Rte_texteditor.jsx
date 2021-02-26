import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

const BodyTextEditor = (props) => {
  // set initial value for rte
  // if is edit element or add new element
  const [value, setValue] = useState(props.initialDescription ? RichTextEditor.createValueFromString(props.initialDescription, 'html') : RichTextEditor.createEmptyValue());
  const onChange = (value) => {
    setValue(value);
    if (props.setFormValue) {
      props.setFormValue(value);
    }
  };

  return <RichTextEditor value={value} onChange={onChange} />;
};

export default BodyTextEditor;