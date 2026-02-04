import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import useRequisicao from "../hooks/useRequisicao";

const Formulario = (valor: { dados: {} }) => {
  const [formularioValor, setFormularioValor] = useState<object>(valor.dados);
  const [msg, setMsg] = useState<string>("");
  const { requisicao } = useRequisicao();
  const enviar = (e: ChangeEvent) => {
    e.preventDefault();

    requisicao({
      url: "http://127.0.0.1:8000/api/login",
      metodo: "post",
      dados: formularioValor,
    });

    // axios
    //   .post("http://127.0.0.1:8000/api/login", formularioValor, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (!res.data.msg.erro) {
    //       setMsg(res.data.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const changeFormulario = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormularioValor({ ...formularioValor, [name]: value });
  };

  return (
    <form onSubmit={enviar}>
      {Object.entries(formularioValor).map(([chave, valor]) => {
        return (
          <div key={chave}>
            <input
              type="text"
              value={valor}
              name={chave}
              onChange={(e) => changeFormulario(e)}
            />
          </div>
        );
      })}
      <Button color="success">ENVIAR</Button>
    </form>
  );
};

export default Formulario;
