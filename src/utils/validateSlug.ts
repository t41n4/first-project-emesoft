export const validateSlug = (slug: string | number | string[]) => {
  // only number
  const regexNumber = /^[0-9]*$/;
  // only string
  const regexString = /^[a-zA-Z]*$/;
  // check if slug is number
  const isNumber = regexNumber.test(slug);
  // console.log('isNumber: ', isNumber);
  // check if slug is string
  const isString = regexString.test(slug);
  return isNumber;
};
