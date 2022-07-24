import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Button, Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegistered ? <LoginScreen /> : <RegisterScreen />}
        <Button
          onClick={() => {
            setIsRegistered(!isRegistered);
          }}
        >
          切换到{isRegistered ? "注册" : "登陆"}
        </Button>
      </Card>
    </div>
  );
};
