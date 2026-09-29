"use client";

import { ArrowUp, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { useChat } from "./ChatProvider";

// Formato mínimo para las respuestas: **negrita**, [enlaces](/ruta) y listas con "- "
function Rich({ text }: { text: string }) {
  const bold = (line: string) =>
    line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        return (
          <Link key={i} href={link[2]} className="chat-link">
            {link[1]}
          </Link>
        );
      }
      return part;
    });

  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={blocks.length}>
          {list.map((item, i) => (
            <li key={i}>{bold(item)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  text.split("\n").forEach((line) => {
    const m = line.match(/^\s*[-*•]\s+(.*)/);
    if (m) {
      list.push(m[1]);
    } else {
      flush();
      blocks.push(
        <Fragment key={blocks.length}>
          {bold(line)}
          {"\n"}
        </Fragment>,
      );
    }
  });
  flush();
  return <>{blocks}</>;
}

function ChatBody({ autoFocus = false, compact = false }: { autoFocus?: boolean; compact?: boolean }) {
  const { messages, loading, suggestions, send } = useChat();
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    void send(text);
  };

  return (
    <>
      <div className="chat-log" ref={logRef} aria-live="polite">
        {messages.map((m, i) =>
          m.role === "assistant" && !m.content ? (
            <div key={i} className="msg assistant typing" aria-label="Escribiendo">
              <span />
              <span />
              <span />
            </div>
          ) : (
            <div key={i} className={`msg ${m.role}`}>
              {m.role === "assistant" ? <Rich text={m.content} /> : m.content}
            </div>
          ),
        )}
      </div>
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <Sparkles size={18} className="lead-icon" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregúntame lo que quieras sobre mí…"
          aria-label="Pregunta sobre Adrián"
          maxLength={1500}
          autoFocus={autoFocus}
        />
        <button className="send" type="submit" disabled={!input.trim() || loading} aria-label="Enviar">
          <ArrowUp size={18} />
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {(compact ? suggestions.slice(0, 3) : suggestions).map((s) => (
            <button key={s} type="button" onClick={() => submit(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="chat-note">Asistente con respuestas preparadas por Adrián. Solo habla de su trabajo.</div>
    </>
  );
}

export function InlineChat() {
  return (
    <div className="chat glass" id="chat">
      <ChatBody />
    </div>
  );
}

export function FloatingChat() {
  const { drawerOpen, setDrawerOpen } = useChat();
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(pathname === "/");

  // En la home, el botón flotante aparece cuando el chat principal sale de pantalla
  useEffect(() => {
    const target = document.getElementById("chat");
    if (!target) {
      setHeroVisible(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  if (heroVisible && !drawerOpen) return null;

  return (
    <>
      {drawerOpen && (
        <div className="drawer glass" role="dialog" aria-label="Chat con Adrián">
          <div className="drawer-head">
            <span>Pregúntame</span>
            <button onClick={() => setDrawerOpen(false)} aria-label="Cerrar chat">
              <X size={18} />
            </button>
          </div>
          <ChatBody autoFocus compact />
        </div>
      )}
      <button className="fab glass" onClick={() => setDrawerOpen(!drawerOpen)} aria-expanded={drawerOpen}>
        <span className="brand-dot" />
        <span className="fab-label">{drawerOpen ? "Cerrar" : "Pregúntame"}</span>
      </button>
    </>
  );
}
