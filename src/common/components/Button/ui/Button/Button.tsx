import { CoreButton } from '@ui/Button/ui/CoreButton/CoreButton';
import { CancelButton } from '@ui/Button/ui/CancelButton/CancelButton';
import { IconButton } from '@ui/Button/ui/IconButton/IconButton';
import { SubmitButton } from '@ui/Button/ui/SubmitButton/SubmitButton';

export const Button = Object.assign(CoreButton, {
  Cancel: CancelButton,
  Icon: IconButton,
  Submit: SubmitButton,
});
