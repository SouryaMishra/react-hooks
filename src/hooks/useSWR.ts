/*
The first argument key is for deduplication, we can safely ignore it for now
*/

import { useState, useEffect } from "react";

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T;
  error?: E;
} {
  const [apiResult, setApiResult] = useState<{ data?: T; error?: E }>({});

  // your code here
  useEffect(() => {
    const result = fetcher();
    if (result instanceof Promise) {
      result
        .then((data) => {
          setApiResult({ data });
        })
        .catch((error) => {
          setApiResult({ error });
        });
    } else {
      setApiResult({ data: result });
    }
  }, [fetcher]);

  return apiResult;
}
