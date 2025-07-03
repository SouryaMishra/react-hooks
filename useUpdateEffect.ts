
import React, {useEffect, EffectCallback, DependencyList} from 'react';

// type EffectCallback = () => void | Destructor

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Returning the effect's value is necessary to make the 4th test case pass which expects a cleanup function to be returned
    return effect(); 
  }, deps)

}
