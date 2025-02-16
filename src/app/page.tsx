import React from "react";


export default function Login() {
  return (
    <div className="container">
      <div className="content">
        <div className="logo-section">
          <img className="logo" src="./logo.png"/>
          <h1 className="title">Entre no Heart</h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite Seu Email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite Sua Senha"/>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}