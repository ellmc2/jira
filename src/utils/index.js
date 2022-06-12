import { useEffect, useState } from "react";

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

/**
 * @description: customHook useMount 在组建加载完成后执行一次
 * @param callback
 * @return {*}
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * @description: customHook debouncedValue 防抖的value
 * @param value 需要防抖的value
 * @param delay 延迟
 * @return {*}
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完之后再执行
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
