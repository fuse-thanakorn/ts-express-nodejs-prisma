// eslint-disable-next-line max-len
const pick = (obj: object, keys: string[]) => keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
  if (obj && Object.hasOwnProperty.call(obj, key)) {
    // eslint-disable-next-line no-param-reassign
    finalObj[key] = obj[key as keyof typeof obj];
  }
  return finalObj;
}, {});

export default pick;
