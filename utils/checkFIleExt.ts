export const checkFIleExt = (file: File) => {
  return file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg';
};
