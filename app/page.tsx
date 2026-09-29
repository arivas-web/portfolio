import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CasesExplorer } from "@/components/CasesExplorer";
import { InlineChat } from "@/components/Chat";
import { Icon } from "@/components/Icon";
import { formatDate, getCases, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

const highlights = [
  { value: "+24.000 €", label: "ahorrados al año con IA" },
  { value: "−92 %", label: "tiempo de producción de contenido" },
  { value: "900+", label: "posts convertidos en datos" },
  { value: "2 años", label: "de problema de RevOps, resuelto" },
];

const skills = [
  {
    icon: "sparkles",
    scene: "scene-lavender",
    title: "IA aplicada",
    text: "Sistemas por capas, agentes y servidores MCP que resuelven trabajo real, no demos.",
  },
  {
    icon: "workflow",
    scene: "scene-lagoon",
    title: "RevOps y HubSpot",
    text: "Lead scoring, intención de compra, cadencias SDR y datos limpios de principio a fin.",
  },
  {
    icon: "megaphone",
    scene: "scene-rose",
    title: "Generación de demanda",
    text: "Inbound, webinars, email y LinkedIn medidos en reuniones, pipeline y ARR.",
  },
  {
    icon: "phone",
    scene: "scene-meadow",
    title: "Producto",
    text: "Diseño y construyo mis propias apps con IA, como Cashtor.",
  },
];

export default function Home() {
  const cases = getCases().map(({ body: _body, ...c }) => c);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="status-pill glass">
            <i /> Abierto a nuevos proyectos
          </span>
          <h1>
            Sistemas que venden <span className="serif">mientras duermes</span>
          </h1>
          <p className="lead">
            Soy {site.fullName}. {site.tagline}
          </p>
          <InlineChat />
        </div>
      </section>

      <section style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="stats glass">
            {highlights.map((h) => (
              <div className="stat" key={h.label}>
                <b>{h.value}</b>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="casos">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Casos de éxito</span>
              <h2>
                Resultados, <span className="serif">no promesas</span>
              </h2>
            </div>
            <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
              Cada caso es un sistema que sigue funcionando hoy. Filtra por área o entra en el detalle.
            </p>
          </div>
          <CasesExplorer cases={cases} />
        </div>
      </section>

      <section id="sobre-mi">
        <div className="container about">
          <div className="about-card glass">
            <span className="eyebrow">Sobre mí</span>
            <h2 style={{ marginTop: 8 }}>
              Mi trabajo es <span className="serif">quitarme mi propio trabajo</span>
            </h2>
            <p>
              Trabajo en marketing en {site.company}, donde se cruzan marketing, ventas, datos e inteligencia artificial.
              Cualquier tarea que hago más de dos veces es candidata a convertirse en un sistema.
            </p>
            <p>
              Parto de datos reales antes que de «buenas prácticas», mido en pipeline y ARR, y cuento lo que construyo
              para que otros equipos puedan replicarlo, también lo que todavía no está resuelto.
            </p>
            <div className="cta-actions" style={{ justifyContent: "flex-start" }}>
              <Link href="#chat" className="btn btn-dark">
                Pregúntame
              </Link>
              <Link href="/blog" className="btn btn-glass">
                Leer el blog
              </Link>
            </div>
          </div>
          <div className="skills glass">
            {skills.map((s) => (
              <div className="skill" key={s.title}>
                <span className={`skill-icon ${s.scene}`}>
                  <Icon name={s.icon} size={18} />
                </span>
                <div>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section id="blog">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Blog</span>
                <h2>
                  Lo que aprendo, <span className="serif">contado</span>
                </h2>
              </div>
              <Link href="/blog" className="btn btn-glass">
                Ver todos <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="posts">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="post glass">
                  <span className="post-meta">
                    {formatDate(p.date)} · {p.readingTime}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contacto">
        <div className="container">
          <div className="cta glass scene-sky">
            <h2>
              ¿Tienes un proceso que <span className="serif">debería funcionar solo?</span>
            </h2>
            <p>Cuéntamelo. Si se puede convertir en un sistema, lo hablamos.</p>
            <div className="cta-actions">
              {site.email && (
                <a href={`mailto:${site.email}`} className="btn btn-dark">
                  Escríbeme
                </a>
              )}
              {site.linkedin && (
                <a href={site.linkedin} className="btn btn-glass">
                  LinkedIn
                </a>
              )}
              <Link href="#chat" className="btn btn-glass">
                Pregúntame
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
