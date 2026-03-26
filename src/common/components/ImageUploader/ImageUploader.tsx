import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ImageUploader.module.scss';
import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';

interface ImageUploaderProps {
  value?: File | string ;
  onChange?: (file: File ) => void;
  previewUrl?: string;
  className?: string;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  previewUrl: externalPreviewUrl,
  className,
  disabled = false,
  accept = '.png, .jpg, .jpeg, .gif, .webp',
  maxSize = 5,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string >(null);
  const [error, setError] = useState<string >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (externalPreviewUrl) {
      setPreviewUrl(externalPreviewUrl);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === 'string') {
      setPreviewUrl(value);
    }
  }, [value, externalPreviewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      return;
    }

    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`Размер файла не должен превышать ${maxSize}MB`);
      return;
    }

    if (accept && !accept.split(',').some(type => file.name.toLowerCase().endsWith(type.trim().replace('.', '')))) {
      setError('Неподдерживаемый формат файла');
      return;
    }

    onChange?.(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setError(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={clsx(styles.container, className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className={styles.hiddenInput}
      />

      <div
        className={clsx(styles.uploadArea, {
          [styles.hasPreview]: !!previewUrl,
          [styles.disabled]: disabled,
          [styles.error]: !!error,
        })}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className={styles.previewContainer}>
            <img src={previewUrl} alt="Preview" className={styles.preview} />
            <div className={styles.overlay}>
              <Button
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                <Icon icon="trash" size="sm" />
                Удалить
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div>
              <Icon icon="image" size="lg" />
              <p>Нажмите для загрузки изображения</p>
              <p className={styles.hint}>или перетащите файл сюда</p>
            </div>
          </div>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
