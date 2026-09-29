# Portfolio · Adrián Rivas

Web personal con casos de éxito, blog y un chat de IA que solo habla de mí. Hecha con Next.js y diseño liquid glass claro.

## Arrancar en local

```bash
npm install
cp .env.example .env.local   # y pon tu ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Nombre, rol, email, LinkedIn, dominio | `lib/site.ts` |
| Lo que sabe el chat de IA sobre ti | `content/about.md` (más los casos y artículos, que se le pasan solos) |
| Casos de éxito | `content/casos/*.md` |
| Artículos del blog | `content/blog/*.md` |
| Colores, cristal, chips | `app/globals.css` |
| Iconos y colores de cada categoría | `lib/tags.ts` |

Los comentarios `<!-- ... -->` dentro de los `.md` son notas privadas: no se publican ni los lee el chat.

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

Haz commit y push: Vercel lo publica solo. El chat de IA también lo conocerá desde ese momento.

### Añadir un caso de éxito

Copia cualquier archivo de `content/casos/` y cambia el frontmatter (`metric`, `metricLabel`, `stats`, `tags`, `order`). El caso con `order: 1` es el destacado. Las etiquetas generan los chips de filtro automáticamente.

## Chat de IA

- Ruta: `app/api/chat/route.ts`. Usa Claude (`claude-opus-5-5`) con streaming.
- Solo responde sobre ti a partir de `content/`. Si algo no está ahí, dice que no lo sabe.
- Límite de 30 preguntas por hora e IP y mensajes de 1.500 caracteres como máximo.

## Publicar en Vercel

1. Entra en [vercel.com](https://vercel.com), crea un proyecto e importa este repositorio.
2. En *Settings → Environment Variables* añade `ANTHROPIC_API_KEY`.
3. Deploy. Después puedes conectar tu dominio en *Settings → Domains*.
