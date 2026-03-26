import { useCallback, useRef } from "react";
import { 
  PopupPosition, 
  AnchorAlign,
  BoundaryOptions, 
  ElementRect, 
  PositionStyles, 
  calculatePopupPosition 
} from "./popupUtils";


const DEFAULT_OFFSET = 15;
const DEFAULT_BOUNDARY_OPTIONS: BoundaryOptions = {
  checkBoundary: true,
  margin: 10,
  flip: true
};

export interface UsePopupPositionOptions {
  anchorRef: React.MutableRefObject<HTMLElement>,
  popupRef: React.MutableRefObject<HTMLElement>,
  position?: PopupPosition | keyof typeof PopupPosition,
  offset?: number,
  boundary?: BoundaryOptions,
  anchorAlign?: AnchorAlign
}



 
export const usePopupPosition = ({ 
  position = PopupPosition.BOTTOM, 
  anchorRef, 
  popupRef,
  offset = DEFAULT_OFFSET,
  boundary = DEFAULT_BOUNDARY_OPTIONS,
  anchorAlign = AnchorAlign.CENTER
}: UsePopupPositionOptions) => {
  
  const lastKnownRect = useRef<{
    anchor: ElementRect ,
    popup: ElementRect 
  }>({
    anchor: null,
    popup: null
  });

  return useCallback((): PositionStyles  => {
    const anchorElement = anchorRef.current;
    const popupElement = popupRef.current;

    
    if (!popupElement || !anchorElement) {
      return null;
    }

    
    
    const actualAnchor = (anchorElement.firstElementChild as HTMLElement) || anchorElement;
    const anchorRect = actualAnchor.getBoundingClientRect();
    const popupRect = popupElement.getBoundingClientRect();

    
    lastKnownRect.current = {
      anchor: anchorRect,
      popup: popupRect
    };

    
    const positionEnum = (typeof position === 'string' && position in PopupPosition)
      ? PopupPosition[position as keyof typeof PopupPosition]
      : position as PopupPosition;

    
    return calculatePopupPosition(
      positionEnum,
      anchorRect,
      popupRect,
      offset,
      boundary,
      anchorAlign
    );
  }, [position, anchorRef, popupRef, offset, boundary, anchorAlign]);
};


export { PopupPosition, AnchorAlign, type PositionStyles, type BoundaryOptions, type ElementRect };
