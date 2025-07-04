/*

Implement a useInputControl hook that manages a controlled input value and tracks additional form input states like:

Property	         Tracks	                                            When it becomes true	                                   When it becomes false
Touched	           If input has been focused then blurred	            When the user blurs the input (focus -> blur)	           Never resets automatically
Dirty	             If value has been changed before	                  When the user types something                            Never resets automatically	
Different	          If value is different from the original	          When the value is different from the initial	           When the value is same as the initial

The handleX functions returned by the hook are meant to be called on the relevant event handlers of <input> in order for the hook to work as intended.

export default function Component() {
  const nameInput = useInputControl('Oliver');

  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={nameInput.value}
          onChange={nameInput.handleChange}
          onBlur={nameInput.handleBlur}
        />
      </div>
      <p>Touched: {nameInput.touched.toString()}</p>
      <p>Dirty: {nameInput.dirty.toString()}</p>
      <p>Different: {nameInput.different.toString()}</p>
      <button type="submit" disabled={!nameInput.different}>
        Submit
      </button>
      <button type="button" onClick={nameInput.reset}>
        Reset
      </button>
    <form>
  );
}
Arguments
initialValue: string: The initial value of the input
Returns
The hook returns an object with the following properties:

value: string: The current value of the input
dirty: boolean: Whether the user has been modified at least once
touched: boolean: Whether the input was focused and blurred
different: boolean: Whether the value is different from the initial value
handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void: A function that updates the value of the input
handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void: A function that to be called when the input is blurred
reset: () => void: A function to reset to the initial value as well as the value of all states

*/

import { type ChangeEvent, type FocusEvent, useState } from "react";

interface UseInputValueReturn {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
  dirty: boolean;
  touched: boolean;
  different: boolean;
}

export default function useInputControl(
  initialValue: string
): UseInputValueReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [dirty, setDirty] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [different, setDifferent] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setDirty(true);
    setDifferent(initialValue !== e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setDirty(false);
    setTouched(false);
    setDifferent(false);
  };

  return {
    value,
    handleChange,
    handleBlur,
    reset,
    dirty,
    touched,
    different,
  };
}
