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
    <>
      {/* Overlay incorporado */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
        }}
      ></div>
      {/* Alerta */}
      <div
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "1rem",
          padding: "15px",
          width: "30%",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          zIndex: 1001,
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
            width: "auto",
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Fazer login novamente
        </button>
      </div>
    </>
  );
};

export default Alert;
