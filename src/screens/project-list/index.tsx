import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  // 用于存放input输入框输入的用户名以及用户id
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  // 用于存放接口返回的项目列表
  const [list, setList] = useState([]);

  // 用于存放用户列表
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const useDebouncedParams = useDebounce(params, 2000);

  const client = useHttp();

  useEffect(() => {
    setLoading(true);
    client("projects", {
      data: cleanObject(useDebouncedParams),
    })
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDebouncedParams]);

  useMount(() => {
    client("users", {
      data: cleanObject(useDebouncedParams),
    }).then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list} loading={loading} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
