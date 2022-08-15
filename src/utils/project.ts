import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  const client = useHttp();
  const fetchProjects = () =>
    client("projects", {
      data: cleanObject(params || {}),
    });

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params]);

  return result;
};
