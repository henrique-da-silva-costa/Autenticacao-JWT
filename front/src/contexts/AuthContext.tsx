// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

interface User {
  nome: string;
  email: string;
}

interface LoginDados {
  dados: {
    email?: string;
    password?: string;
    [key: string]: any; // Permite outros campos adicionais
  };
}

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  login: (dados: LoginDados) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const paginar = useNavigate();

  // Verificar se tem usuário logado ao iniciar
  useEffect(() => {
    const token = Cookies.get("token");
    const salvarUsuario = localStorage.getItem("user");

    if (token && salvarUsuario) {
      setUser(JSON.parse(salvarUsuario));
      paginar("/home");
      setLoading(false);
      return;
    }

    paginar("/");

    setLoading(false);
  }, []);

  // Função de login
  const login = async (dadosLogin: LoginDados) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: dadosLogin.dados?.email ?? "",
        password: dadosLogin.dados?.password ?? "",
        // Outros campos do formulário serão enviados se existirem
        ...dadosLogin.dados,
      });

      const { token, usuario } = response.data;

      Cookies.set("token", token, { expires: 1 });

      console.log(response.data);

      // Salvar usuário
      localStorage.setItem("user", JSON.stringify(usuario));
      setUser(user);
      paginar("/home");

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer login",
      };
    }
  };

  // Função de logout
  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    paginar("/");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
