import Formulario from "../componentes/Formulario";
import useRequisicao from "../hooks/useRequisicao";

const Login = () => {
  const inputs: object = {
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
};

export default Login;
