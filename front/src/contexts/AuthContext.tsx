// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

interface User {
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se tem usuário logado ao iniciar
  useEffect(() => {
    const token = Cookies.get("token");
    const salvarUsuario = localStorage.getItem("user");

    if (token && salvarUsuario) {
      setUser(JSON.parse(salvarUsuario));
    }

    setLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Salvar token no cookie (7 dias)
      Cookies.set("token", access_token, { expires: 1 });

      // Salvar usuário
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
