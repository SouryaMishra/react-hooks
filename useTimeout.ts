/*
Create a hook to easily use setTimeout(callback, delay).

Reset the timer if delay changes
DO NOT reset the timer if only callback changes


*/

import React, { useEffect, useState, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
  const timerId = (useRef < number) | (null > null);
  const prevDelay = useRef(delay);

  useEffect(() => {
    if (delay !== prevDelay.current && timerId.current !== null) {
      clearTimeout(timerId.current);
    }

    prevDelay.current = delay;

    if (typeof callback === "function" && delay != null) {
      timerId.current = setTimeout(callback, delay);
    }
  }, [delay, callback]);

  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  // your code here
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const [text, setText] = useState("your app");
  const [count, setCount] = useState(0);

  useTimeout(() => setText("my app after " + count + "secs"), count * 1000);

  return (
    <div>
      {text}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const timerId = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timerId);
  }, [delay]);
}
