import axios from "axios";
import "./App.css";
import { Button } from "reactstrap";
import { useState } from "react";

function App() {
  const [token, setToken] = useState<string>("");

  const dados: object = {
    nome: "Henrique",
    email: "henrique@live.com",
    senha: "123456",
  };

  const enviar = () => {
    axios.defaults.withCredentials = true;

    axios
      .get("http://127.0.0.1:8000/csrf-token")
      .then((res) => {
        axios
          .post("http://127.0.0.1:8000/cadastro", dados, {
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRF-TOKEN": res.data.csrf_token,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <p>Hello, World!</p>
      <Button color="warning" onClick={() => enviar()}>
        AKI
      </Button>
      {/* <button className="btn btn-success">AKI</button> */}
    </>
  );
}

export default App;
