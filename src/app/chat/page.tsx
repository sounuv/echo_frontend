"use client";
import { useState } from "react";
import { Menu, Plus, Mic, Headphones, Search, Settings, User } from "lucide-react";
import { Zap } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchWebActive, setSearchWebActive] = useState(false);

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Heart - OpenAI</span>
          <Plus size={20} className="icon" />
        </div>
        <span className="sidebar-subtitle">Definir como padrão</span>
      </aside>
      <main className="content-chat">
        <h1 className="title-chat">ECHO</h1>

        <div className="search-bar relative">
          <input
            type="text"
            className="search-input relative" 
            placeholder="Como posso ajudar você hoje?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            <Plus size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-15 transform -translate-y-full w-48 bg-white rounded-md shadow-lg z-10">
              <button className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
                Pesquisar na web
                <button
                  onClick={() => setSearchWebActive(!searchWebActive)}
                  className={`ml-2 ${searchWebActive? 'bg-blue-500 text-white': 'border border-gray-300'} rounded-md px-2 py-1 text-xs`}
                >
                  {searchWebActive? 'Ativado': 'Desativado'}
                </button>
              </button>
              <button className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
                Fazer upload de arquivo
              </button>
            </div>
          )}
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
      <div className="top-icons">
        <Settings className="icon" />
        <User className="icon" />
      </div>
    </div>
  );
}