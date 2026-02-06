import { useState, type ChangeEvent } from "react";
import useRequisicao from "../hooks/useRequisicao";
import { FormGroup, Input, InputLabel, Button } from "@mui/material";
import useValidacao from "../hooks/useValidacao";

const Formulario = (valor: { dados: {} }) => {
  const [formularioValor, setFormularioValor] = useState<object>(valor.dados);
  const { requisicao, msg } = useRequisicao();
  const { tipoInput } = useValidacao();

  const enviar = (e: ChangeEvent) => {
    e.preventDefault();

    requisicao({
      url: "http://127.0.0.1:8000/api/login",
      metodo: "post",
      dados: formularioValor,
    });
  };

  const changeFormulario = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormularioValor({ ...formularioValor, [name]: value });
  };

  return (
    <>
      <div
        style={{ top: "25%" }}
        className="d-flex flex-column align-items-center position-absolute start-0 end-0 gap-3"
      >
        <h2>LOGIN</h2>
        <div className="">
          <form onSubmit={enviar}>
            <FormGroup className="d-flex flex-column align-items-center position-absolute top-20 start-0 end-0 gap-3">
              {Object.entries(formularioValor).map(([chave, valor]) => {
                return (
                  <div key={chave}>
                    <InputLabel className="text-capitalize">{chave}</InputLabel>
                    <Input
                      error={false}
                      required
                      type={tipoInput(chave)}
                      value={valor}
                      name={chave}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        changeFormulario(e)
                      }
                    />
                  </div>
                );
              })}
              <Button type="submit" color="success">
                ENTRAR
              </Button>
              <span>{msg}</span>
            </FormGroup>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
