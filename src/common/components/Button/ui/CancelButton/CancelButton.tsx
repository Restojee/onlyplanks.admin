import { type CancelButtonProps } from '@ui/Button/common/types';
import { Button } from "@ui/Button";

export const CancelButton = (props: CancelButtonProps) => (
  <Button 
    {...props} 
    type="button"
    bgColor="paletteColorsSecondary"
    hoverBgColor="paletteBorderNormal"
  />
);
