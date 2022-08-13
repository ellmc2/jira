import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  const client = useHttp();

  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(params || {}),
      })
    );
  }, [params]);

  return result;
};
