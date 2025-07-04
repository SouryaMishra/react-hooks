/*
Implement a useMediatedState hook that is similar to useState, but supports a mediator function that runs on each state set. This mediator function can be used to transform or intercept state updates.

const replaceMultipleSpaces = (s) => s.replace(/[\s]+/g, ' ');

export default function Component() {
  const [state, setState] = useMediatedState(replaceMultipleSpaces, '');

  return (
    <div>
      <div>You will not be able to enter more than one space</div>
      <input
        type="text"
        min="0"
        max="10"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}
Arguments
mediator: A function that receives the new state and returns the transformed state. This function can have two forms:

(newState: T) => T that receives 1 argument: the new state dispatched by setState, and returns the final state, or
(newState: T, dispatch) => void that receives 2 arguments: the new state dispatched by setState, and a function dispatch that will actually run the state update. It returns nothing.
initialState: The initial state value

Note: mediator should stay the same, even if it's changed into a new and/or different function.

Returns
The hook returns an array with two elements:

The current state
The function setState to update the state. It must be the same as the second element of the array returned by useState
Essentially, the hook returns the same values as useState.
*/

import { useState, type Dispatch, type SetStateAction } from "react";

interface StateMediator<S = unknown> {
  (newState: S): S;
  (newState: S, dispatch: Dispatch<SetStateAction<S>>): void;
}

export default function useMediatedState<S = unknown>(
  mediator: StateMediator<S>,
  initialState?: S
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);

  const setMediatedState = (valueOrUpdater) => {
    const argsCount = mediator.length;
    if (argsCount === 1) {
      const newState =
        typeof valueOrUpdater === "function"
          ? mediator(valueOrUpdater(state))
          : mediator(valueOrUpdater);
      setState(newState);
    } else {
      mediator(
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(state)
          : valueOrUpdater,
        setState
      );
    }
  };

  return [state, setMediatedState];
}
