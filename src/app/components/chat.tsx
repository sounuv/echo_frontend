"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mic, Zap } from "lucide-react";
import { marked } from "marked";
import styles from "./chat.module.css";
import loading from "@/public/loading.gif";
import Image from "next/image";
import Alert from "../components/alert";

interface Message {
  role: "user" | "assistant";
  content: string;
}
interface ChatProps {
  setTokenExpired: (expired: boolean) => void;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [search, setSearch] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const suggestions = [
    {
      title: "Quem é a Blue Saúde?",
      sub: "Entenda a missão e visão da Blue...",
      message:
        "Me explique quem é a Blue Saúde e qual é a missão da empresa como uma health tech.",
    },
    {
      title: "Como o Echo pode te ajudar?",
      sub: "Descubra funcionalidades do Echo!",
      message: "O que o Echo pode fazer para me ajudar?",
    },
    {
      title: "Administradoras parceiras",
      sub: "Descubra as administradoras que apoiam...",
      message: "Quais as administradoras que a Blue Saúde tem parceria?",
    },
  ];

  const handleSuggestionClick = (text: string) => {
    setSearch(text);
    setNewMessage(text);
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    if (isSending) return;

    const userMessageContent: string = newMessage.trim();
    if (!userMessageContent) return;

    setIsSending(true);

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessageContent },
    ];
    setMessages(updatedMessages);

    setFirstMessageSent(true);
    setNewMessage("");
    setShowTitle(false);
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Erro ao obter resposta da API: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";
      let firstChunkReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantResponse += decoder.decode(value, { stream: true });

        if (!firstChunkReceived) {
          setIsLoading(false);
          firstChunkReceived = true;
        }

        setMessages((prevMessages) => {
          const latestMessages = [...prevMessages];
          const lastMessage = latestMessages[latestMessages.length - 1];

          if (lastMessage && lastMessage.role === "assistant") {
            lastMessage.content = assistantResponse;
          } else {
            latestMessages.push({
              role: "assistant",
              content: assistantResponse,
            });
          }
          return latestMessages;
        });
      }
    } catch (error) {
      console.error("Erro geral ao processar requisição:", error);
      setErrorMessage("Seu token expirou. Logue novamente por favor");
    } finally {
      setIsLoading(false);
      setIsSending(false);
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const conversationId = "chat123";

  const saveConversation = (messages: Message[]) => {
    sessionStorage.setItem(conversationId, JSON.stringify(messages));
  };

  const getConversation = (): Message[] => {
    const storedMessages = sessionStorage.getItem(conversationId);
    return storedMessages ? JSON.parse(storedMessages) : [];
  };

  useEffect(() => {
    const storedMessages = getConversation();
    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
      setFirstMessageSent(true);
      setShowTitle(false);
    }
  }, []);

  useEffect(() => {
    saveConversation(messages);
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles["chat-container"]}>
      <div>
        {errorMessage && (
          <Alert message={errorMessage} onClose={closeErrorMessage} />
        )}
      </div>
      {showTitle && <h1 className={styles["title-chat"]}>ECHO</h1>}
      {!firstMessageSent && (
        <div className={styles["suggestions-wrapper"]}>
          <div className="search-bar relative">
            <input
              type="text"
              className="search-input relative"
              placeholder="Como posso ajudar você hoje?"
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              disabled={isSending}
            />
            <Mic size={20} className="input-icon" />
          </div>
          <div className={styles["suggestions"]}>
            <span className={styles["suggestions-title"]}>
              <Zap size={16} className={styles["suggestions-icon"]} /> Sugerido
            </span>
            <div className={styles["suggestions-container"]}>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className={styles["suggestion-card"]}
                  onClick={() => handleSuggestionClick(item.message)}
                >
                  <strong className={styles["suggestion-title"]}>
                    {item.title}
                  </strong>
                  <p className={styles["suggestion-sub"]}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles["messages-container"]} ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles["message"]} ${
              message.role === "user"
                ? styles["user-message"]
                : styles["assistant-message"]
            }`}
            dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
          />
        ))}
        {isLoading && (
          <div className={styles["assistant-message"]}>
            <div className={styles["loading-svg-container"]}>
              <Image src={loading} width={90} height={90} alt="Carregando..." />
            </div>
          </div>
        )}
      </div>
      {firstMessageSent && (
        <div className="search-bar relative fixed">
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
    </div>
  );
};

export default Chat;
