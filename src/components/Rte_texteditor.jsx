import React, { useState } from 'react';
import RichTextEditor from 'react-rte';

const BodyTextEditor = (props) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const onChange = (value) => {
    setValue(value);
    if (props.setFormValue) {
      props.setFormValue(value);
    }
  };

  return <RichTextEditor value={value} onChange={onChange} />;
};

export default BodyTextEditor;