import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();

  const client = useHttp();

  useEffect(() => {
    run(
      client("users", {
        data: cleanObject(params || {}),
      })
    );
  }, [params]);

  return result;
};
