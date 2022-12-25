import { useEffect, useState } from "react";

type UseMediaQueryArgs =
  | {
      from: number;
      to?: number;
    }
  | {
      from?: number;
      to: number;
    };

export function useMediaQuery({ from, to }: UseMediaQueryArgs) {
  const queryFrom = from ? `(min-width: ${from}px)` : null;
  const queryTo = to ? `(max-width: ${to}px)` : null;
  const query =
    queryFrom && queryTo
      ? `${queryFrom} and ${queryTo}`
      : queryFrom
      ? queryFrom
      : queryTo
      ? queryTo
      : "";

  const media =
    typeof document !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(media);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
