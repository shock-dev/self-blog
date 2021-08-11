import { RefObject } from 'react';
import styles from './Upload.module.scss';

interface UploadProps {
  uploadRef: RefObject<HTMLInputElement>
  onChange: any
}

const Upload = ({
  uploadRef,
  onChange
}: UploadProps) => {
  return (
    <label className={styles.custom}>
      <input onChange={onChange} type="file" ref={uploadRef} hidden />
      <img src="/images/download.png" alt="Download" />
    </label>
  );
};

export default Upload;
