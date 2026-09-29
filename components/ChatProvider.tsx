"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { initialSuggestions } from "@/content/chat";
import { answer } from "@/lib/assistant";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatState = {
  messages: ChatMessage[];
  loading: boolean;
  suggestions: string[];
  send: (text: string) => Promise<void>;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const ChatContext = createContext<ChatState | null>(null);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat debe usarse dentro de ChatProvider");
  return ctx;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loadingRef = useRef(false);

  const send = useCallback(async (text: string) => {
    const question = text.trim();
    if (!question || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setSuggestions([]);
    setMessages((prev) => [...prev, { role: "user", content: question }, { role: "assistant", content: "" }]);

    const reply = answer(question);
    const update = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

    // Pequeña pausa y efecto de escritura para que se sienta como una conversación
    await wait(450);
    const words = reply.text.split(/(\s+)/);
    for (let i = 0; i < words.length; i += 4) {
      update(words.slice(0, i + 4).join(""));
      await wait(18);
    }

    setSuggestions(reply.followUps);
    loadingRef.current = false;
    setLoading(false);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, loading, suggestions, send, drawerOpen, setDrawerOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
