"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Zap, Settings, LogOut, X, Info, Pencil } from "lucide-react";
import Modal from "../components/modal";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [showUsers, setShowUsers] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);  
  const [newMessage, setNewMessage] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);


  const [users, setUsers] = useState([
    { id: 1, name: "Usuário 1" },
    { id: 2, name: "Usuário 2" },
]);

  const router = useRouter();
  
  useEffect(() => {
    const storedIsAdmin = sessionStorage.getItem("isAdmin") === "true";
    setIsAdmin(storedIsAdmin);
  }, []);

  const handleSuggestionClick = (text: string) => {
    setSearch(text);
  };

  const [profileImage, setProfileImage] = useState("./user.png");
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("profileImage", base64String);
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const imageDataURL = profileImage; 
    localStorage.setItem("profileImage", imageDataURL);
    setModalOpen(false);
};

const handleEditUser = (userId: number) => { 
  console.log(`Editar usuário com ID: ${userId}`);
};

const handleDeleteUser = (userId: number) => {
  console.log(`Deletar usuário com ID: ${userId}`);
};

const handleResetPassword = (userId: number) => {
  console.log(`Resetar senha do usuário com ID: ${userId}`);
};


const handleSendMessage = async () => {
  setMessages([...messages, { role: "user", content: newMessage }]);
  setFirstMessageSent(true);
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado no sessionStorage.");
      return;
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": sessionStorage.getItem("token") ?? "",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: newMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao obter resposta da API");
    }

    const data = await response.json();
    const chatResponse = data;

    setMessages([
      ...messages,
      { role: "user", content: newMessage },
      { role: "assistant", content: chatResponse },
    ]);

    setNewMessage("");
    if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
      } catch (error) {
          console.error("Erro ao obter resposta da API:", error);
      }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Echo</span>
        </div>
      </aside>
      <main className="content-chat">
        <h1 className="title-chat">ECHO</h1>
        {!firstMessageSent && (
        <>
          <div className="search-bar relative">
          <input
            type="text"
            className="search-input relative"
            placeholder="Como posso ajudar você hoje?"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <Mic size={20} className="input-icon" />
          </div>
          <div className="suggestions">
            <span className="suggestions-title">
              <Zap size={16} className="suggestions-icon" /> Sugerido
            </span>
            <div className="suggestions-container">
              {[
                { title: "Quem é a Blue Saúde?", sub: "Entenda a missão e visão da  Blue...", message: "Me explique quem é a Blue Saúde e qual é a   missão da empresa como uma health tech." },
                { title: "Como o Echo pode te ajudar?", sub: "Descubra  funcionalidades do Echo!", message: "O que o Echo pode fazer para me   ajudar?" },
                { title: "Administradoras parceiras", sub: "Descubra as   administradoras que apoiam...", message: "Quais as administradoras  que a Blue Saúde tem parceria?" }
              ].map((item, index) => (
              <div key={index} className="suggestion-card" onClick={() =>   handleSuggestionClick(item.message)}>
                  <strong className="suggestion-title">{item.title}</strong>
                  <p className="suggestion-sub">{item.sub}</p>
              </div>
              ))}
            </div>
          </div>
          </>
        )}
        <div className="messages-container" ref={messagesContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        {firstMessageSent && (
          <div className="search-baar relative">
            <input
            type="text"
            className="search-input relative"
            placeholder="Como posso ajudar você hoje?"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          </div>
        )}
      </main>
      <div className="top-icons relative">
        <img
          id="profileDrop"
          className="icon cursor-pointer"
          src={profileImage}
          alt="User"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={() => { setModalOpen(true); setDropdownOpen (false); setShowAccount(true); }}>
            <Settings size={16} className="dropdown-icon" />
              Configurações
            </div>
            <div className="dropdown-item" onClick={() => { router.push("/"); setDropdownOpen(false); }}>
                <LogOut size={16} className="dropdown-icon" />
                Sair
            </div>
        </div>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        profileImage={profileImage}
        onProfileImageChange={handleProfileImageChange}
        onSave={handleSave}
        isAdmin={isAdmin}
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}