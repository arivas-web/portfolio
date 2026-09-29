---
title: "Cadencias de prospección en HubSpot: un problema de dos años, resuelto"
summary: "Diseñé e implementé desde cero el sistema que ordena la prospección de las SDRs por pasos y decide automáticamente si cada empresa avanza o se queda."
metric: "2 años"
metricLabel: "de problema, resuelto"
stats:
  - value: "100 %"
    label: "diseño e implementación"
  - value: "Auto"
    label: "avance de paso"
  - value: "Dic 2026"
    label: "primera revisión de ARR"
tags: ["RevOps", "Ventas"]
order: 3
date: "2026-09-23"
---

## Contexto

Desde que la empresa empezó a usar HubSpot, casi dos años antes, no existía un sistema que ordenase la prospección de las SDRs por pasos ni que determinase de forma automática si un registro avanzaba o no. Cada SDR lo llevaba a su manera y la trazabilidad era casi imposible.

## Qué construí

- Una **propiedad central de estado de cadencia** que define en qué paso de la prospección está cada empresa.
- La **lógica de avance**: según ese estado y el estado de la tarea asociada, el registro pasa al siguiente paso o se mantiene en el actual. Sin decisiones manuales y sin hojas de cálculo paralelas.
- La base para medir **conversión por paso**: cuántas empresas avanzan, cuántas acaban en reunión y cuántas en oportunidad.

## Resultado

El sistema ya está en producción con el equipo de SDRs. Los KPIs acordados son el volumen de empresas que entran en cadencia y la conversión por estado, con revisión de impacto en pipeline y ARR en diciembre de 2026.

Además, es la base sobre la que se apoya el sistema de lead scoring e intención de compra.
