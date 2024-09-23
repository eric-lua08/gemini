import { useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef<() => void>();
  const delayRef = useRef<any>(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      delayRef.current = setInterval(tick, delay);
      return clear;
    }
  }, [delay]);

  const clear = () => {
    clearInterval(delayRef.current);
    delayRef.current = 0;
  }

  return clear;
}