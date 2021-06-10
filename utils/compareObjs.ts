export const compareObjs = (fObj, sObj): boolean => {
  return JSON.stringify(fObj) === JSON.stringify(sObj);
};
