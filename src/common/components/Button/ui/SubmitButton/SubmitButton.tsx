import { type SubmitButtonProps } from '@ui/Button/common/types';
import * as React from "react";
import { Button } from "@ui/Button";

export const SubmitButton = (props: SubmitButtonProps) => <Button {...props} type="submit" />;
