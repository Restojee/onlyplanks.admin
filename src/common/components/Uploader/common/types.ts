import type * as React from 'react';

export interface ImageFormPropsType {
  placeholder?: string;
  name?: string;
  onImageUpload: (file: File) => void;
  image?: string;
  className?: string;
}

export type UploaderDragEvent = React.DragEvent<HTMLInputElement>;
export type UploaderDragEventHandler = (event: UploaderDragEvent) => void;
export type UploaderChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type UploaderChangeEventHandler = (event: UploaderChangeEvent) => void;
export type UploaderFileChangeEventHandler = (files: FileList ) => void;
