import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import { useDocumentTitle } from "utils";

export const UnauthenticatedApp = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("请登陆或注册以继续");

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title> {hasAccount ? "请登陆" : "请注册"}</Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {hasAccount ? (
          <LoginScreen onError={setError} />
        ) : (
          <RegisterScreen onError={setError} />
        )}
        <Divider />
        <a
          onClick={() => {
            setHasAccount(!hasAccount);
          }}
        >
          {hasAccount ? "没有账号？注册新账号" : "已经有账号了？直接登陆"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgba(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
