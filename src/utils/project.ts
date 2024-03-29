import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  const client = useHttp();
  const fetchProjects = useCallback(
    () =>
      client("projects", {
        data: cleanObject(params || {}),
      }),
    // 非状态的非基本类型不可以直接放到useCallback的依赖中
    [client, params]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params, fetchProjects, run]);

  return result;
};
