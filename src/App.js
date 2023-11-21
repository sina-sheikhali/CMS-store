import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
function App() {
  return (
    <>
      <Sidebar />
      <div className="pr-[250px] px  p-10">
        <Header />
      </div>
    </>
  );
}

export default App;
