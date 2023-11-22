import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Sidebar />
      <div className="pr-[250px]  py-20">
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
