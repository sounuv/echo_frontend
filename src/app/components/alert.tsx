import React from "react";
import { useRouter } from "next/navigation";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#e63946",
        color: "#ffff",
        fontWeight: "bold",
        borderRadius: "1rem",
        padding: "10px",
        paddingBottom: "10px",
        width: "30%",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
      }}
    >
      <span style={{ marginBottom: "10px", display: "block", width: "100%" }}>
        {message}
      </span>
      <button
        onClick={handleLoginRedirect}
        style={{
          backgroundColor: "#333",
          color: "#fff",
          fontWeight: "bold",
          padding: "8px",
          borderRadius: "1rem",
          border: "none",
          cursor: "pointer",
          justifyContent: "center",
        }}
      >
        Fazer login novamente
      </button>
    </div>
  );
};

export default Alert;
