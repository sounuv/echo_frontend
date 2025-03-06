"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Captura os valores digitados nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Realiza o login com a API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(false); 
    setSuccess(false); 

    try {
      const response = await fetch('http://172.233.20.225/api/auth/login', {
        method: 'POST',
        headers: {
          'Accept': '/',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": form.email, // Usando o email como username
          "password": form.password
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      const token = data.token; // Armazena o token

      // Armazenar o token de forma segura (ex: sessionStorage)
      sessionStorage.setItem('token', token);

      setSuccess(true); 
      setTimeout(() => {
        setSuccess(false);
        router.push("/chat"); 
      }, 2000); 

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(true); 
      setTimeout(() => setError(false), 4000); 
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
      <div className="container">
        {/* Alerta de erro */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900 text-red-200 p-4 rounded-md shadow-lg">
            <strong>⚠️ O email ou senha estão incorretos.</strong>
            <p>Verifique os dados e tente novamente.</p>
          </div>
        )}

        {/* Alerta de sucesso */}
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite Seu Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite Sua Senha"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <label className="forgot-password" onClick={handleForgotPassword}>Esqueci minha senha</label>
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
              <p>Entre em contato com seu administrador para recuperar a senha.</p>
              <button onClick={closeModal} className="mt-4 bg-#2e04ff hover:bg-blue-500 text-white font-bold">
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
  );
}