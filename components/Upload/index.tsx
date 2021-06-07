import React, { RefObject } from 'react';
import styles from './Upload.module.scss';

interface UploadProps {
  ref: RefObject<HTMLInputElement>
  onChange: any
}

const Upload = ({
  ref,
  onChange
}: UploadProps) => {
  return (
    <label className={styles.custom}>
      <input onChange={onChange} type="file" ref={ref} hidden />
      <img src="/images/download.png" alt="Download" />
    </label>
  );
};

export default Upload;
