import React, { useState } from 'react';

const OperationCardInputField = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // in order to not show equal symbol when there is no result but have  empty spaces in input field
    // in place of if else used try catch to handle error
    if (inputValue.trim() !== '') {
      try {
        const calculatedResult = eval(inputValue);
        setResult(calculatedResult);
      } catch (error) {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  };

  return (
    <div>
      <span>{result !== null && <> {result} = </>}</span>
      <input
        className=" px-2 rounded-2 input_fields"
        type="text"
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default OperationCardInputField;
