import * as React from 'react';
import clsx from 'clsx';
import {
  type ImageFormPropsType,
  type UploaderChangeEventHandler,
  type UploaderFileChangeEventHandler,
} from '@ui/Uploader/common/types';
import { inputAccept } from '@ui/Uploader/common/constants';
import styles from './Uploader.module.scss';
import { Center, Paper } from "@ui/Layout";
import { Typography } from "@ui/Typography";

export const Uploader = (props: ImageFormPropsType) => {
  const { onImageUpload, className, name, image } = props;

  const inputFile = React.useRef<HTMLInputElement >(null);

  const handleClick = React.useCallback(() => {
    const inputElement = inputFile.current;
    inputElement?.click();
  }, [inputFile]);

  const uploadFile: UploaderFileChangeEventHandler = React.useCallback(
    (files) => {
      if (!files?.length) {
        return;
      }

      const [file] = files;
      onImageUpload(file);
    },
    [onImageUpload],
  );

  const uploadHandler: UploaderChangeEventHandler = React.useCallback(
    (event) => {
      const { files } = event.target;
      uploadFile(files);
    },
    [uploadFile],
  );

  
  
  
  
  
  
  
  
  
  
  
  
  

  return (
    <Paper
      className={clsx([className, styles])}
      onClick={handleClick}
      
      
      
      
      
    >
      <input
        accept={inputAccept.image}
        name={name}
        type="file"
        ref={inputFile}
        onChange={uploadHandler}
        style={{ display: 'none' }}
      />

      {!image && (
        <Center>
          <Typography>Загрузите или перетащите изображение</Typography>
        </Center>
      )}
    </Paper>
  );
};
