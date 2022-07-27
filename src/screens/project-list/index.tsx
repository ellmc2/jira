import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { clearObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

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

  const useDebouncedParams = useDebounce(params, 2000);

  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: clearObject(useDebouncedParams),
    }).then(setList);
  }, [useDebouncedParams]);

  useMount(() => {
    client("users", {
      data: clearObject(useDebouncedParams),
    }).then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
