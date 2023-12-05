import Header from "./Components/Header/Header";
import { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
function App() {
  const router = useRoutes(routes);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <Sidebar openSidebar={openSidebar} />
      <div
        className={` ${
          openSidebar ? "pr-0 lg:pr-[70px]" : "pr-0 lg:pr-[245px]"
        } py-24 transition-all duration-300`}
      >
        <Header isOpen={openSidebar} setIsOpen={setOpenSidebar} />
        {router}
      </div>
    </>
  );
}

export default App;
