import axios from "axios";
import Cookies from "js-cookie";
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
  const [dados, setDados] = useState<object>({});

  const getToken = () => {
    return Cookies.get("token");
  };

  // Função para salvar token nos cookies
  const setToken = (token: string) => {
    Cookies.set("token", token, {
      expires: 1,
    });
  };

  const removeToken = () => {
    Cookies.remove("token");
  };

  const requisicao = async (valor: objsProps) => {
    try {
      const res = await axios({
        method: valor.metodo,
        url: valor.url,
        data: valor.dados ? valor.dados : {},
      });

      setDados(res.data);

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
  const requisicaoLogin = async (valor: objsProps) => {
    try {
      const res = await axios({
        method: valor.metodo,
        baseURL: valor.url,
        data: valor.dados ? valor.dados : {},
      });

      console.log(res.data);

      if (res.data.token) {
        Cookies.set("token", res.data.token, { expires: 1 });
      }

      // setDados(res.interceptors.request.use);

      // res.interce;

      // validarRespostaRequisicao(res.data);
      // if (res.data.erro) {
      //   setMsg(res.data.msg);
      //   return;
      // }

      // setMsg(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    setToken,
    getToken,
    removeToken,
    requisicao,
    requisicaoLogin,
    msg,
    dados,
  };
}
