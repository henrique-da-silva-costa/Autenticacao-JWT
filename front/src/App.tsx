import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import Login from "./paginas/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
