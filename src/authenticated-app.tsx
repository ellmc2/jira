import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};

const PageHeader = styled(Row)`
  height: 6rem;
  background-color: gray;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh -6rem);
`;
