import { useState } from "react";
import type { tiposMensagens } from "../interfaces/mensagens";

interface validar {
  erro?: boolean | undefined;
  msg?: string | null;
  email?: string;
  senha?: string;
}

export default function useValidacao() {
  const [msg, setMsg] = useState<tiposMensagens>("");
  const validarRespostaRequisicao = (valor: validar) => {
    if (valor.erro) {
      setMsg(valor.msg);
    }
  };

  const tipoInput = (tipo: string) => {
    if (tipo == "password") {
      return "password";
    }

    if (tipo == "email") {
      return "email";
    }

    return "text";
  };

  return {
    validarRespostaRequisicao,
    tipoInput,
    msg,
  };
}
