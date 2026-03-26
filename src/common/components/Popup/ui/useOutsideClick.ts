import { useEffect, RefObject } from "react";

export const useOutsideClick = (
  refs: RefObject<HTMLElement>[],
  handler?: () => void,
  enabled: boolean = true,
  checkAdditionalElements?: (target: Node) => boolean
) => {
  useEffect(() => {
    if (!enabled || !handler) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      for (const ref of refs) {
        if (ref.current?.contains(target)) {
          return
        }
      }

      if (checkAdditionalElements && checkAdditionalElements(target)) {
        return;
      }

      handler();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler, enabled, checkAdditionalElements]);
};
