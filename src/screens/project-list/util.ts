import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

/**
 * @description: 项目列表搜索的参数
 * @return {*}
 */
export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({
        ...params,
        personId: Number(params.personId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
