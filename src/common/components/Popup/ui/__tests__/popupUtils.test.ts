import {
  PopupPosition,
  AnchorAlign,
  calculateBasePosition,
  adjustToViewport,
  calculatePopupPosition,
  type ElementRect,
  type ViewportSize,
  type BoundaryOptions,
} from '../popupUtils';

describe('popupUtils', () => {
  const mockAnchorRect: ElementRect = {
    width: 100,
    height: 50,
    top: 200,
    left: 300,
    right: 400,
    bottom: 250,
  };

  const mockPopupRect: ElementRect = {
    width: 150,
    height: 100,
    top: 0,
    left: 0,
    right: 150,
    bottom: 100,
  };

  const mockViewportSize: ViewportSize = {
    width: 1920,
    height: 1080,
  };

  describe('calculateBasePosition', () => {
    it('должен правильно рассчитывать позицию BOTTOM с CENTER выравниванием', () => {
      const result = calculateBasePosition(
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        8,
        AnchorAlign.CENTER
      );

      expect(result.top).toBe(258); 
      expect(result.left).toBe(275); 
      expect(result.position).toBe('absolute');
    });

    it('должен правильно рассчитывать позицию TOP с START выравниванием', () => {
      const result = calculateBasePosition(
        PopupPosition.TOP,
        mockAnchorRect,
        mockPopupRect,
        8,
        AnchorAlign.START
      );

      expect(result.top).toBe(92); 
      expect(result.left).toBe(300); 
    });

    it('должен правильно рассчитывать позицию RIGHT с START выравниванием', () => {
      const result = calculateBasePosition(
        PopupPosition.RIGHT,
        mockAnchorRect,
        mockPopupRect,
        8,
        AnchorAlign.START
      );

      expect(result.top).toBe(200); 
      expect(result.left).toBe(408); 
    });

    it('должен правильно рассчитывать позицию LEFT с END выравниванием', () => {
      const result = calculateBasePosition(
        PopupPosition.LEFT,
        mockAnchorRect,
        mockPopupRect,
        8,
        AnchorAlign.END
      );

      expect(result.top).toBe(150); 
      expect(result.left).toBe(142); 
    });

    it('должен правильно рассчитывать позицию BOTTOM с END выравниванием', () => {
      const result = calculateBasePosition(
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        8,
        AnchorAlign.END
      );

      expect(result.top).toBe(258); 
      expect(result.left).toBe(250); 
    });
  });

  describe('adjustToViewport', () => {
    const boundaryOptions: BoundaryOptions = {
      checkBoundary: true,
      margin: 10,
      flip: true,
    };

    it('не должен изменять позицию, если попап помещается', () => {
      const basePosition = { top: 300, left: 400 };
      const result = adjustToViewport(
        basePosition,
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        mockViewportSize,
        boundaryOptions,
        8
      );

      expect(result.top).toBe(300);
      expect(result.left).toBe(400);
    });

    it('должен применить flip с RIGHT на LEFT, если не помещается справа', () => {
      const anchorNearRightEdge: ElementRect = {
        ...mockAnchorRect,
        left: 1800,
        right: 1900,
      };

      const basePosition = { top: 200, left: 1908 }; 
      const result = adjustToViewport(
        basePosition,
        PopupPosition.RIGHT,
        anchorNearRightEdge,
        mockPopupRect,
        mockViewportSize,
        boundaryOptions,
        8
      );

      
      expect(result.left).toBe(1642);
    });

    it('должен применить flip с LEFT на RIGHT, если не помещается слева', () => {
      const anchorNearLeftEdge: ElementRect = {
        ...mockAnchorRect,
        left: 50,
        right: 150,
      };

      const basePosition = { top: 200, left: -108 }; 
      const result = adjustToViewport(
        basePosition,
        PopupPosition.LEFT,
        anchorNearLeftEdge,
        mockPopupRect,
        mockViewportSize,
        boundaryOptions,
        8
      );

      
      expect(result.left).toBe(158);
    });

    it('должен применить flip с BOTTOM на TOP, если не помещается снизу', () => {
      const anchorNearBottom: ElementRect = {
        ...mockAnchorRect,
        top: 1000,
        bottom: 1050,
      };

      const basePosition = { top: 1058, left: 300 }; 
      const result = adjustToViewport(
        basePosition,
        PopupPosition.BOTTOM,
        anchorNearBottom,
        mockPopupRect,
        mockViewportSize,
        boundaryOptions,
        8
      );

      
      expect(result.top).toBe(892);
    });

    it('должен применить flip с TOP на BOTTOM, если не помещается сверху', () => {
      const anchorNearTop: ElementRect = {
        ...mockAnchorRect,
        top: 50,
        bottom: 100,
      };

      const basePosition = { top: -58, left: 300 }; 
      const result = adjustToViewport(
        basePosition,
        PopupPosition.TOP,
        anchorNearTop,
        mockPopupRect,
        mockViewportSize,
        boundaryOptions,
        8
      );

      
      expect(result.top).toBe(108);
    });

    it('должен корректировать позицию к границам, если flip отключен', () => {
      const noBoundaryOptions: BoundaryOptions = {
        checkBoundary: true,
        margin: 10,
        flip: false,
      };

      const basePosition = { top: -50, left: -50 };
      const result = adjustToViewport(
        basePosition,
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        mockViewportSize,
        noBoundaryOptions,
        8
      );

      expect(result.top).toBe(10); 
      expect(result.left).toBe(10); 
    });

    it('не должен применять корректировку, если checkBoundary = false', () => {
      const noBoundaryOptions: BoundaryOptions = {
        checkBoundary: false,
      };

      const basePosition = { top: -50, left: -50 };
      const result = adjustToViewport(
        basePosition,
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        mockViewportSize,
        noBoundaryOptions,
        8
      );

      expect(result.top).toBe(-50);
      expect(result.left).toBe(-50);
    });
  });

  describe('calculatePopupPosition', () => {
    it('должен корректно рассчитывать финальную позицию с учетом границ', () => {
      const boundaryOptions: BoundaryOptions = {
        checkBoundary: true,
        margin: 10,
        flip: true,
      };

      const result = calculatePopupPosition(
        PopupPosition.BOTTOM,
        mockAnchorRect,
        mockPopupRect,
        8,
        boundaryOptions,
        AnchorAlign.CENTER
      );

      expect(result.position).toBe('absolute');
      expect(typeof result.top).toBe('number');
      expect(typeof result.left).toBe('number');
    });

    it('должен применить flip при необходимости в комплексном расчете', () => {
      const anchorNearRightEdge: ElementRect = {
        width: 100,
        height: 50,
        top: 200,
        left: 1800,
        right: 1900,
        bottom: 250,
      };

      const boundaryOptions: BoundaryOptions = {
        checkBoundary: true,
        margin: 10,
        flip: true,
      };

      const result = calculatePopupPosition(
        PopupPosition.RIGHT,
        anchorNearRightEdge,
        mockPopupRect,
        8,
        boundaryOptions,
        AnchorAlign.START
      );

      
      expect(result.left).toBeLessThan(1800);
    });
  });
});
