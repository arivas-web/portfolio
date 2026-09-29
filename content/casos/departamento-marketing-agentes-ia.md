---
title: "Un departamento de marketing hecho de agentes de IA"
summary: "Un sistema de agentes y subagentes que cubre contenido, SDR, diseño y reporting, desplegado al equipo como servidor MCP: una sola versión de las instrucciones y credenciales que nunca salen del servidor."
metric: "1 servidor"
metricLabel: "todos los agentes, para todo el equipo"
stats:
  - value: "MCP"
    label: "servidor remoto"
  - value: "0"
    label: "credenciales en local"
  - value: "100 %"
    label: "uso medido"
tags: ["IA", "Marketing"]
order: 4
date: "2026-09-24"
---

<!-- TODO: añade horas ahorradas por persona y usuarios activos cuando termine el piloto. -->

## La idea

Tengo montado un sistema de **agentes y subagentes** que funciona como un departamento de marketing construido con IA: contenido, apoyo a SDRs, diseño, reporting. Hasta ahora solo lo usaba yo desde Claude Code. El reto era que lo usara todo el equipo **sin perder el control**.

## El problema de compartirlo

Compartir el repositorio sin más implica que cada persona edite las instrucciones en local y acabe con su propia versión. Además, las credenciales de HubSpot, Jira o Notion terminarían repartidas por los portátiles del equipo.

## La arquitectura

- El repositorio se convierte en un **servidor MCP remoto**, desplegado y controlado por marketing.
- El administrador lo añade como **conector** en la organización de Claude. El equipo solo tiene que activarlo y hablar con los agentes.
- **Las instrucciones viven en el servidor**: nadie las modifica y cualquier mejora llega a todos al instante.
- **Las credenciales solo existen en el servidor.**
- **Registro de uso** por persona y herramienta para medir la adopción de verdad.

## Estado

Piloto con un primer agente y escalado al resto si convence. Es la pieza que convierte la IA de «lo que usa Adrián» en infraestructura del departamento.
