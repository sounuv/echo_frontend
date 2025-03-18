"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import Modal from "../components/modal";
import Chat from "../components/chat";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [users, setUsers] = useState([
    { id: 1, name: "Usuário 1" },
    { id: 2, name: "Usuário 2" },
  ]);

  const [profileImage, setProfileImage] = useState("./user.png");
  const router = useRouter();

  useEffect(() => {
    const storedIsAdmin = sessionStorage.getItem("isAdmin") === "true";
    setIsAdmin(storedIsAdmin);
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
    } else {
      const storedIsAdmin = sessionStorage.getItem("isAdmin") === "true";
      setIsAdmin(storedIsAdmin);

      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [router]);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Echo</span>
        </div>
      </aside>
      <main className="content-chat">
        <Chat />
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
            <div
              className="dropdown-item"
              onClick={() => {
                setModalOpen(true);
                setDropdownOpen(false);
                setShowAccount(true);
              }}
            >
              <Settings size={16} className="dropdown-icon" />
              Configurações
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                sessionStorage.removeItem("isAuthenticated");
                router.push("/");
                setDropdownOpen(false);
              }}
            >
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
