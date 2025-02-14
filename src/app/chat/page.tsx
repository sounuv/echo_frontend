"use client";
import { useState } from "react";
import { Menu, Plus, Mic, Headphones, Search, Settings, User } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Menu size={22} className="icon" />
          <span className="sidebar-title">Heart - OpenAI</span>
          <Plus size={20} className="icon" />
        </div>
        <span className="sidebar-subtitle">Definir como padrão</span>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 className="title">
          HEART</h1>

        <div className="search-bar">
          <button className="search-btn">
            <Plus size={16} />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Como posso ajudar você hoje?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Mic className="icon" />
          <Headphones className="icon" />
        </div>

        <div className="suggestions">
          <span className="suggestions-title">⚡ Sugerido</span>
          <div className="suggestions-container">
            {["Quem é a Blue Saúde?", "Administrador Parceiros", "Como o Heart pode te ajudar?"].map(
              (text, index) => (
                <button key={index} className="suggestion-btn">
                  {text}
                  <p className="suggestion-sub">Descubra mais sobre o Heart...</p>
                </button>
              )
            )}
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
