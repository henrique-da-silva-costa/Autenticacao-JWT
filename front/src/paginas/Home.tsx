import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <h1>Pagina inicial</h1>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Home;
