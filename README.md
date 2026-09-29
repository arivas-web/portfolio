# Portfolio · Adrián Rivas

Web personal con casos de éxito, blog y un asistente de chat que solo habla de mí. Hecha con Next.js y diseño liquid glass claro. No usa ninguna API ni tiene coste: el chat funciona con lógica propia en el navegador.

## Arrancar en local

```bash
npm install
npm run dev   # http://localhost:3000
```

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Nombre, rol, email, LinkedIn, dominio | `lib/site.ts` |
| Preguntas y respuestas del chat | `content/chat.ts` |
| Casos de éxito | `content/casos/*.md` |
| Artículos del blog | `content/blog/*.md` |
| Colores, cristal, chips | `app/globals.css` |
| Iconos y colores de cada categoría | `lib/tags.ts` |

Los comentarios `<!-- ... -->` dentro de los `.md` son notas privadas: no se publican.

### Publicar un artículo

Crea `content/blog/mi-articulo.md`:

```md
---
title: "Título del artículo"
excerpt: "Una o dos frases que aparecen en la tarjeta."
date: "2026-10-01"
tags: ["IA", "RevOps"]
readingTime: "5 min"
---

Texto en Markdown...
```

Haz commit y push: Vercel lo publica solo. Si quieres que el chat lo mencione, añádelo en la respuesta del tema `blog` de `content/chat.ts`.

### Añadir un caso de éxito

Copia cualquier archivo de `content/casos/` y cambia el frontmatter (`metric`, `metricLabel`, `stats`, `tags`, `order`). El caso con `order: 1` es el destacado. Las etiquetas generan los chips de filtro automáticamente.

## Chat

- Las respuestas están en `content/chat.ts`. Cada tema tiene sus palabras clave, su respuesta y preguntas sugeridas para seguir.
- La lógica está en `lib/assistant.ts`: normaliza la pregunta (sin tildes ni mayúsculas), puntúa cada tema según las palabras clave que aparecen (las frases valen más que las palabras sueltas) y responde con el que más puntúa.
- Si no coincide nada, responde que solo puede hablar de ti y sugiere preguntas.
- Para un tema nuevo, copia un bloque en `content/chat.ts`. Si una pregunta cae en el tema equivocado, añade una frase más concreta a las `keywords` del tema correcto.

## Publicar en Vercel

1. Entra en [vercel.com](https://vercel.com), crea un proyecto e importa este repositorio.
2. Deploy. No hace falta configurar nada más.
3. Después puedes conectar tu dominio en *Settings → Domains*.
