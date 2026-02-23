import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type userTipo = {
  nome: string;
  email: string;
};

const Home = () => {
  const { logout } = useContext(AuthContext);
  const user: userTipo | null = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
    },
    header: {
      backgroundColor: "#343a40",
      color: "white",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoutButton: {
      padding: "8px 16px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    content: {
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    email: {
      color: "#666",
      marginBottom: "30px",
    },
    card: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Dashboard</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sair
          </button>
        </div>

        <div style={styles.content}>
          <h2>Bem-vindo, {user?.nome}!</h2>
          <p style={styles.email}>Email: {user?.email}</p>

          <div style={styles.card}>
            <h3>Você está logado!</h3>
            <p>
              Esta é uma área protegida que só aparece para usuários
              autenticados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
