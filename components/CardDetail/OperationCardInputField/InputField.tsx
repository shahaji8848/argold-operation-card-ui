import React from 'react';

const InputField = ({ label, value, handleChange, readOnly }: any) => {
  console.log('readOnly', readOnly);
  return (
    <div className="fs-14 ">
      <input
        type="text"
        name={label}
        className="form-control dark-blue"
        id={label}
        value={value}
        readOnly={readOnly}
        onChange={(e: any) => {
          handleChange(label, e.target.value);
        }}
        disabled={readOnly}
      />
    </div>
  );
};

export default InputField;
