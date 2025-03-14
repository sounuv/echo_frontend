"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (response.status === 401) {
        setError(true);
        setTimeout(() => setError(false), 4000);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      const token = data.access_token;
      const isAdmin = data.is_admin;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isAdmin", isAdmin);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/chat");
      }, 2000);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };

  return (
    <div className="container">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900 text-red-200 p-4 rounded-md shadow-lg">
          <strong>⚠️ O usuário ou senha estão incorretos</strong>
          <p>Verifique os dados e tente novamente.</p>
        </div>
      )}

      {success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-900 text-green-200 p-4 rounded-md shadow-lg">
          <strong>✅ Você agora está logado.</strong>
        </div>
      )}

      <div className="content">
        <div className="logo-section">
          <img className="logo" src="./logo.png" alt="Logo" />
          <h1 className="title">Entre no Echo</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <label className="forgot-password" onClick={handleForgotPassword}>
          Esqueci minha senha
        </label>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <p>
              Entre em contato com seu administrador para recuperar a senha.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-#2e04ff hover:bg-blue-500 text-white font-bold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
