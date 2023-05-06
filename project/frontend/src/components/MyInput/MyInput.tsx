import { useState } from 'react';
import './myInput.css';

const MyInput = ({ onInputApply, placeholder }
: { onInputApply: (input: string) => void, placeholder: string }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = (): void => {
    onInputApply(inputValue);
  };

  return (
    <>
      <input
        className="my-input"
        type="text"
        name="component"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e): void => setInputValue(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>Go!</button>
    </>
  );
};

export default MyInput;
