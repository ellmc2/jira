/**
 * @description: 判断传入的值是否为falsy，兼容值为 0 的情况，为 0 时视为 非falsy。
 * @param value
 * @return {*}
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * @description: 将传入的对象值为falsey的去掉，并返回新的对象
 * @param undefined
 * @return {*}
 */
export const clearObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (isFalsy(result[key])) {
      delete result[key];
    }
  });
  return result;
};
