import { type ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

interface TextareaProps {
  children?: ReactElement;
  className?: string;
}
export const Textarea = (props: TextareaProps) => {
  const { children, className } = props;

  return <span className={clsx([styles.Textarea, className])}>{ children }</span>;
};
