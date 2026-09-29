// Cada categoría tiene su icono y su "escena" (el fondo que aparece al pasar el ratón).
export const tagStyles: Record<string, { scene: string; icon: string }> = {
  IA: { scene: "scene-lavender", icon: "sparkles" },
  Ventas: { scene: "scene-sky", icon: "trending" },
  RevOps: { scene: "scene-lagoon", icon: "workflow" },
  Contenido: { scene: "scene-dawn", icon: "pen" },
  Marketing: { scene: "scene-rose", icon: "megaphone" },
  Producto: { scene: "scene-meadow", icon: "phone" },
  Finanzas: { scene: "scene-gold", icon: "wallet" },
  Operaciones: { scene: "scene-steel", icon: "cog" },
  HubSpot: { scene: "scene-dawn", icon: "database" },
};

export function sceneFor(tag: string) {
  return tagStyles[tag]?.scene ?? "scene-sky";
}
