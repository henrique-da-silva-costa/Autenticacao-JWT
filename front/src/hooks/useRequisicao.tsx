import axios from "axios";

type objsProps = {
  url: string;
  metodo: string;
  dados?: object;
};

export default function useRequisicao() {
  const requisicao = (valor: objsProps) => {
    axios({
      method: valor.metodo,
      url: valor.url,
      data: valor.dados ? valor.dados : {},
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    requisicao,
  };
}
