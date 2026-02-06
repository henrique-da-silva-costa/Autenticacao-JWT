import axios from "axios";
import useValidacao from "./useValidacao";
import { useState } from "react";
import type { tiposMensagens } from "../interfaces/mensagens";

type objsProps = {
  url: string;
  metodo: string;
  dados?: object;
};

export default function useRequisicao() {
  const { validarRespostaRequisicao } = useValidacao();
  const [msg, setMsg] = useState<tiposMensagens>("");

  const requisicao = async (valor: objsProps) => {
    try {
      const res = await axios({
        method: valor.metodo,
        url: valor.url,
        data: valor.dados ? valor.dados : {},
      });

      console.log(res.data);

      validarRespostaRequisicao(res.data);
      if (res.data.erro) {
        setMsg(res.data.msg);
        return;
      }

      setMsg(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    requisicao,
    msg,
  };
}
