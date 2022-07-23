import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div>
      {isRegistered ? <LoginScreen /> : <RegisterScreen />}
      <button
        onClick={() => {
          setIsRegistered(!isRegistered);
        }}
      >
        切换到{isRegistered ? "注册" : "登陆"}
      </button>
    </div>
  );
};
