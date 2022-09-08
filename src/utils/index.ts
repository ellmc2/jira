import { useEffect, useRef, useState } from "react";

/**
 * @description:判断传入的值是否为falsy，兼容值为 0 的情况，为 0 时视为 非falsy。
 * @param {unknown} value
 * @return {boolean}
 */
export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

/**
 * @description: 判断是否是有意义的参数 (isFalsy函数传入false时会被认为是false)
 * @param {unknown} value
 * @return {*}
 */
export const isVoid = (value: unknown): boolean =>
  value == null || value === "";

/**
 * @description: 将传入的对象值为falsey的去掉，并返回新的对象
 * @return {*}
 * @param obj
 */
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
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
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO:依赖项里加入callback会造成无限循环，这和 useCallback 和 useMemo 有关系
  }, [callback]);
};

/**
 * @description: customHook debouncedValue 防抖的value
 * @param value 需要防抖的value
 * @param delay 延迟
 * @return {*}
 */
export const useDebounce = <V>(value: V, delay?: number) => {
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

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    clear: () => setValue([]),
    removeIndex: (index: number) =>
      setValue(value.filter((_, i) => i !== index)),
    add: (item: T) => setValue([...value, item]),
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * @description: 用于返回组件的挂载状态，如果还没挂载或者已经卸载返回false；反之，返回true
 * @return {*}
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
