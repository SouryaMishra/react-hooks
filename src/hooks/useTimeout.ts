/*
Create a hook to easily use setTimeout(callback, delay).

Reset the timer if delay changes
DO NOT reset the timer if only callback changes
*/

import { useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const timerId = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timerId);
  }, [delay]);
}
