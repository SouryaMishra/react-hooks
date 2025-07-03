/*
The first argument key is for deduplication, we can safely ignore it for now
*/

import React, { useState, useEffect, useMemo } from "react";

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

const fetcher = () =>
  new Promise<{ name: string }>((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          name: "BFE.dev",
        }),
      500
    );
  });

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const { data, error } = useSWR("/api", fetcher);

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;
  return <div>succeeded {data.name} </div>;
}
