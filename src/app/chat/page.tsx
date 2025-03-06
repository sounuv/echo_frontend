"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Zap, Settings, LogOut, X, Info, Pencil } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pencilVisible, setPencilVisible] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [showUsers, setShowUsers] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(true);
  
  const [users, setUsers] = useState([
    { id: 1, name: "Usuário 1" },
    { id: 2, name: "Usuário 2" },
]);

  const router = useRouter();
  
  const handleSuggestionClick = (text: string) => {
    setSearch(text);
  };

  const [profileImage, setProfileImage] = useState(() => {
    const storedImage = localStorage.getItem("profileImage");
    return storedImage ? storedImage : "./user.png";
  });

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
  //   const nome = document.getElementById("nome")?.value;
  //   if (nome) {
  //       localStorage.setItem("nome", nome);
  //   }
  //   const senha = document.getElementById("senha")?.value; 
  //   if (senha) {
  //       const senhaHash = btoa(senha);
  //       localStorage.setItem("senha", senhaHash);
  //   }
  //   if (showChangePassword) {
  //     const senhaAtual = (document.getElementById("senhaAtual") as HTMLInputElement)?.value;
  //     const novaSenha = (document.getElementById("novaSenha") as HTMLInputElement)?.value;
  //     const confirmarSenha = (document.getElementById("confirmarSenha") as HTMLInputElement)?.value;

  //     const senhaArmazenada = localStorage.getItem("senha");
  //     if (senhaArmazenada) {
  //         const senhaAtualHash = btoa(senhaAtual);
  //         if (senhaAtualHash !== senhaArmazenada) {
  //             alert("Senha atual incorreta!");
  //             return;
  //         }
  //     }

  //     if (novaSenha !== confirmarSenha) {
  //         alert("As novas senhas não coincidem!");
  //         return;
  //     }
  //     if (novaSenha) {
  //         const senhaHash = btoa(novaSenha); 
  //         localStorage.setItem("senha", senhaHash);
  //     }
  // }
    setModalOpen(false);
};

const handleEditUser = (userId: number) => { 
  console.log(`Editar usuário com ID: ${userId}`);
  // lógica de edição aqui
};

const handleDeleteUser = (userId: number) => {
  console.log(`Deletar usuário com ID: ${userId}`);
  // lógica de deleção aqui
};

const handleResetPassword = (userId: number) => {
  console.log(`Resetar senha do usuário com ID: ${userId}`);
  // lógica de reset de senha aqui
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
        <div className="search-bar relative">
          <input
            type="text"
            className="search-input relative"
            placeholder="Como posso ajudar você hoje?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Mic size={20} className="input-icon" />
        </div>
        <div className="suggestions">
          <span className="suggestions-title">
            <Zap size={16} className="suggestions-icon" /> Sugerido
          </span>
          <div className="suggestions-container">
            {[
              { title: "Quem é a Blue Saúde?", sub: "Entenda a missão e visão da Blue...", message: "Me explique quem é a Blue Saúde e qual é a missão da empresa como uma health tech." },
              { title: "Como o Echo pode te ajudar?", sub: "Descubra funcionalidades do Echo!", message: "O que o Echo pode fazer para me ajudar?" },
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
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6    relative">
          {/* Cabeçalho do modal */}
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-lg font-semibold">Configurações</h2>
            <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700  bg-transparent   p-2 rounded absolute top-4 right-4"
                id="button-closeModal">
              <X size={20} />
            </button>
          </div>
          {/* Layout do Modal */}
          <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/4 pr-4 border-r">
        <nav className="space-y-2">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md" onClick={() => { setShowAccount(true); setShowAbout(false); setShowUsers(false); }}>
            Conta
        </a>
        {isAdmin && (
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md" onClick={() => { setShowAccount(false); setShowAbout(false); setShowUsers(true); }}>
                Usuários
            </a>
        )}
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md" onClick={() => { setShowAccount(false); setShowAbout(true); setShowUsers(false); }}>
            Sobre
          </a>
          </nav>
        </aside>
          {/* Conteúdo */}
          <main className="w-3/4 pl-4">
          {showAccount && (
            <>
          {/* Imagem de Perfil */}
          <div className="profile-modalConfig flex-shrink-0 relative"
            onMouseEnter={() => setPencilVisible(true)}
            onMouseLeave={() => setPencilVisible(false)}
          >
          <img
            className="profileModal"
            src={profileImage}
            alt="User"
          />
          {pencilVisible && (
          <>
          <div className="absolute top-5 left-4" onClick={() => document.getElementById("uploadProfile")?.click()}>
            <img
              className="pen"
              src="./pen.png"
              alt="pen"
            />
            </div>
            <input 
                type="file"
                id="uploadProfile"
                onChange={handleProfileImageChange}
                className="absolute top-5 left-4 w-5 h-5 opacity-0"
            />
          </>
          )}
        </div>
          {/* Campo de Nome */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                  type="text"
                  value="Natalia"
                  disabled
                  className="mt-1 block w-full rounded-md   bg-gray-100   text-gray-800 px-3 py-2 border-none"/>
          </div>
          {/* Mudar Senha */}
          <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700">Mudar Senha</p>
          <span
            className="showHide"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
          {showChangePassword ? "Ocultar" : "Mostrar"}
          </span>
          </div>
          {showChangePassword && (
        <div>
            {/* 1. Senha atual */}
            <div className="mb-4">
                <label htmlFor="senhaAtual" className="block text-sm font-medium text-gray-700">
                    Senha Atual
                </label>
                <input
                    type="password"
                    id="senhaAtual"
                    className="mt-1 block w-full rounded-md bg-gray-100 text-gray-800 px-3 py-2 border-none"
                />
            </div>
            {/* 2. Nova Senha */}
            <div className="mb-4">
                <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-700">
                    Nova Senha
                </label>
                <input
                    type="password"
                    id="novaSenha"
                    className="mt-1 block w-full rounded-md bg-gray-100 text-gray-800 px-3 py-2 border-none"
                />
            </div>
            {/* 3. Confirmar Senha */}
            <div className="mb-4">
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                    Confirmar Nova Senha
                </label>
                <input
                    type="password"
                    id="confirmarSenha"
                    className="mt-1 block w-full rounded-md bg-gray-100 text-gray-800 px-3 py-2 border-none"
                />
              </div>
              </div>
            )}
          {/* ... Salvar ... */}
          <div className="modal-footer">
            <button className="save-button" onClick={handleSave}>
                Salvar
            </button>
          </div>
          </>
          )}
          {/* ... Usuários ... */}
          {/* {showUsers && isAdmin && (
          <div> */}
            {/* Lista de usuários */}
            {/* {users.map(user => (
                <div key={user.id} className="flex justify-between items-center mb-2">
                    <span>{user.name}</span>
                    <div>
                        <button className="text-blue-500 mr-2" onClick={() => handleEditUser(user.id)}>Editar</button>
                        <button className="text-red-500 mr-2" onClick={() => handleDeleteUser(user.id)}>Deletar</button>
                        <button className="text-gray-500" onClick={() => handleResetPassword(user.id)}>Resetar Senha</button>
                    </div>
                </div>
            ))} */}
            {/* Botão para criar novo usuário */}
            {/* <div className="flex justify-end mt-4">
                <button className="text-green-500" title="Criar usuário" onClick={handleCreateUser}>
                    +
                </button>
              </div>
            </div>
            )} */}
          {showAbout && (
            <div className="mt-2 text-sm text-gray-600">
                Echo Versão v0.3.35
            </div>
            )}
          </main>
          </div>
        </div>
      </div>
    )}  
    </div>
  );
}