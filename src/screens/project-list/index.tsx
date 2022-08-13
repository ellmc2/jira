import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Helmet } from "react-helmet";

export const ProjectListScreen = () => {
  // 用于存放input输入框输入的用户名以及用户id
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debouncedParams = useDebounce(params, 2000);

  const { isLoading, error, data: list } = useProjects(debouncedParams);
  const { data: users } = useUsers(debouncedParams);

  return (
    <Container>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
