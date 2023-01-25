import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = (ref: MutableRefObject<null | HTMLDivElement>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current = {
      width: ref.current?.clientWidth ?? 0,
      height: ref.current?.clientHeight ?? 0,
    };
  }, [ref]);

  return dimensions.current;
};
