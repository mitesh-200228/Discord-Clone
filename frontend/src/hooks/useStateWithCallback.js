import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();

  const updateState = useCallback((newstate, cb) => {
    cbRef.current = cb;
    setState((prev) => {
      return typeof newstate === "function" ? newstate(prev) : newstate;
    });
  },[]);

  useEffect(()=>{
    if(cbRef.current){
        cbRef.current(state);
        cbRef.current = null;
    }
  },[state]);

  return [state,updateState];
};
