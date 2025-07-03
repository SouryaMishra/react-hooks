import { DependencyList, useState, useEffect, useRef } from "react";

type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export default function useQuery<T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): AsyncState<T> {
  const [request, setRequest] = useState<AsyncState<T>>({ status: "loading" });

  useEffect(
    () => {
      let shouldUpdateState = true;
      setRequest({ status: "loading" });
      fn()
        .then((data) => {
          if (shouldUpdateState)
            setRequest({
              status: "success",
              data,
            });
        })
        .catch((error) => {
          if (shouldUpdateState)
            setRequest({
              status: "error",
              error,
            });
        });

      return () => {
        shouldUpdateState = false;
      };
    },

    deps,
  );

  return request;
}
