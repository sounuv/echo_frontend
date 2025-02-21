"use client";
import { useState } from "react";
import { Menu, Plus, Mic, Headphones, Search, Settings, User } from "lucide-react";
import { Zap } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchWebActive, setSearchWebActive] = useState(false);

  const handleSuggestionClick = (text: string) => {
    setSearch(text);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Heart</span>
        </div>
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
          <Mic size={20} className="input-icon"/>
        </div>
        <div className="suggestions">
          <span className="suggestions-title">
            <Zap size={16} className="suggestions-icon" /> Sugerido
          </span>
          <div className="suggestions-container">
            {[
              { title: "Quem é a Blue Saúde?", sub: "Entenda a missão e visão da Blue...", message: "Me explique quem é a Blue Saúde e qual é a missão da empresa como uma health tech." },
              { title: "Como o Heart pode te ajudar?", sub: "Descubra funcionalidades do Heart!", message: "O que o Heart pode fazer para me ajudar?" },
              { title: "Administradoras parceiras", sub: "Descubra as administradoras que apoiam...", message: "Quais as administradoras que a Blue Saúde tem parceria?" }
            ].map((item, index) => (
              <div key={index} className="suggestion-card" onClick={() => handleSuggestionClick(item.message)}>
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