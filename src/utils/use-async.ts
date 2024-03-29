import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [retry, setRetry] = useState(() => () => {});
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = useCallback((data: D) => {
    setState({ data, stat: "success", error: null });
  }, []);
  const setError = useCallback((error: Error) => {
    setState({ error, stat: "error", data: null });
  }, []);

  const mountedRef = useMountedRef();

  /**
   * @description: run 方法用于触发异步请求
   * @param {Promise} promise
   * @return {*}
   */
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return (
        promise
          .then((data) => {
            if (mountedRef.current) {
              setData(data);
            }

            return data;
          })
          // catch会消化异常，如果不主动抛出，外层函数是接收不到异常的。
          .catch((error) => {
            setError(error);
            if (config.throwOnError) {
              return Promise.reject(error);
            }
            return error;
          })
      );
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时，重新执行一遍 run，让state 更新
    retry,
    ...state,
  };
};
