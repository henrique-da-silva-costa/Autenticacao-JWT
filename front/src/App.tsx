import { useEffect } from "react";
import "./App.css";
import Formulario from "./componentes/Formulario";
import useRequisicao from "./hooks/useRequisicao";

function App() {
  const inputs: object = {
    // nome: "",
    email: "",
    password: "",
  };

  const { dados } = useRequisicao();

  return (
    <>
      <Formulario dados={inputs} />
      {console.log(Object.keys(dados).length > 0 ? dados : "")}
    </>
  );
}

export default App;
