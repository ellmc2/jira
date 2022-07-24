import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongBtn } from "./index";

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongBtn type="primary" htmlType={"submit"}>
          登录
        </LongBtn>
      </Form.Item>
    </Form>
  );
};
