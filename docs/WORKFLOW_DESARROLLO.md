# Workflow de desarrollo — Alred

Este documento define cómo deben desarrollarse, probarse, revisarse e integrarse
los cambios del proyecto Alred.

El objetivo principal es mantener `main` siempre estable y evitar que nuevas
páginas, funcionalidades, correcciones o cambios realizados manualmente o con IA
rompan partes existentes de la web.

---

# 1. Principio fundamental

`main` representa siempre la versión estable del proyecto.

Debe asumirse que:

- `main` puede desplegarse en producción en cualquier momento;
- ningún desarrollo nuevo debe hacerse directamente sobre `main`;
- ningún cambio debe integrarse en `main` sin haber sido probado previamente;
- una funcionalidad incompleta nunca debe llegar a `main`.

La web publicada no debe utilizarse como entorno de pruebas.

---

# 2. Flujo general

Todo cambio debe seguir este flujo:

```text
main
  ↓
crear rama
  ↓
desarrollar
  ↓
revisar código
  ↓
lint / build
  ↓
pruebas
  ↓
Preview Deployment
  ↓
revisión visual y funcional
  ↓
Pull Request
  ↓
merge a main
  ↓
producción
  ↓
smoke test