import { useEffect } from "react";
import "./App.css";
import Formulario from "./componentes/Formulario";
import useRequisicao from "./hooks/useRequisicao";

function App() {
  const inputs: object = {
    // nome: "",
    email: "",
    senha: "",
  };

  const { requisicao, dados } = useRequisicao();

  useEffect(() => {
    requisicao({
      metodo: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });
  }, []);

  return (
    <>
      <Formulario dados={inputs} />
      {console.log(Object.keys(dados).length > 0 ? dados : "")}
    </>
  );
}

export default App;
