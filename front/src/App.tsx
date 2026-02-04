import "./App.css";
import Formulario from "./componentes/Formulario";

function App() {
  const inputs: object = {
    // nome: "",
    email: "",
    senha: "",
  };

  return (
    <>
      <Formulario dados={inputs} />
    </>
  );
}

export default App;
