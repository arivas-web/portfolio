"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatState = {
  messages: ChatMessage[];
  loading: boolean;
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

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      const history: ChatMessage[] = [...messagesRef.current, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setLoading(true);

      const update = (content: string) =>
        setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          update(data.error ?? "Ahora mismo no puedo responder. Inténtalo de nuevo en un momento.");
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          update(answer);
        }
      } catch {
        update("Ahora mismo no puedo responder. Inténtalo de nuevo en un momento.");
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return (
    <ChatContext.Provider value={{ messages, loading, send, drawerOpen, setDrawerOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
