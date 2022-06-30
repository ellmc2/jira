import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单提交的默认行为
    event.preventDefault();

    // 获取表单数据
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
