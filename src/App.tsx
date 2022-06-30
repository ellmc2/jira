import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
// import { TSReactTest } from "./try-use-array";

import { LoginScreen } from "./screens/login";

function App() {
  return (
    <div className="App">
      <ProjectListScreen />
      <LoginScreen />
      {/* <TSReactTest /> */}
    </div>
  );
}

export default App;
