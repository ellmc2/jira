import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        label={"用户名"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={"密码"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType={"submit"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
