import { fallback, intents } from "@/content/chat";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:()"'«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Puntúa cada tema por las palabras clave que aparecen en la pregunta.
// Las frases de varias palabras pesan más que las palabras sueltas.
function score(question: string, keywords: string[]) {
  const text = ` ${normalize(question)} `;
  const words = text.trim().split(" ");
  let total = 0;
  for (const raw of keywords) {
    const kw = normalize(raw.replace(/\*$/, ""));
    if (!kw) continue;
    const prefix = raw.endsWith("*");
    const weight = kw.includes(" ") ? 3 : 1;
    if (kw.includes(" ")) {
      if (text.includes(` ${kw}`)) total += weight;
    } else if (prefix ? words.some((w) => w.startsWith(kw)) : words.includes(kw)) {
      total += weight;
    }
  }
  return total;
}

export function answer(question: string) {
  let best: (typeof intents)[number] | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const s = score(question, intent.keywords);
    if (s > bestScore) {
      best = intent;
      bestScore = s;
    }
  }
  if (!best) return { text: fallback.answer, followUps: fallback.followUps };
  return { text: best.answer, followUps: best.followUps ?? fallback.followUps };
}
