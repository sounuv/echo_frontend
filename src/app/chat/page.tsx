"use client";
import { useState } from "react";
import { Menu, Plus, Mic, Headphones, Search, Settings, User } from "lucide-react";
import { Zap } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Heart - OpenAI</span>
          <Plus size={20} className="icon" />
        </div>
        <span className="sidebar-subtitle">Definir como padrão</span>
      </aside>

      {/* Main Content */}
      <main className="content-chat">
        <h1 className="title-chat">ECHO</h1>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Como posso ajudar você hoje?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
          <button className="search-icon">
            <Plus size={18} />
          </button>
        </div>
          <div className="suggestions">
            <span className="suggestions-title">
              <Zap size={16} className="suggestions-icon" /> Sugerido 
            </span>
            <div className="suggestions-container">
              {[
                { title: "Quem é a Blue Saúde?", sub: "Entenda a missão e visão da Blue..." },
                { title: "Como o Heart pode te ajudar?", sub: "Descubra funcionalidades do Heart!" },
                { title: "Administradoras parceiras", sub: "Descubra as administradoras que apoiam..." }
                ].map((item, index) => (
                <div key={index} className="suggestion-card">
                  <strong className="suggestion-title">{item.title}</strong>
                  <p className="suggestion-sub">{item.sub}</p>
                </div>
            ))}
          </div>
        </div>
      </main>

      {/* Top Icons */}
      <div className="top-icons">
        <Settings className="icon" />
        <User className="icon" />
      </div>
    </div>
  );
}