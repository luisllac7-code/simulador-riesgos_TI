# Simulador-riesgos_TI

Simulador educativo de riesgos y resiliencia de servicios TI.
Representa escenarios ficticios de phishing, inyección SQL, DDoS y fallas físicas sin ejecutar ataques reales.

![Estado](https://img.shields.io/badge/estado-activo-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-educativa-blue)
![Docker](https://img.shields.io/badge/docker-compose-2496ED?logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

---

## 📑 Índice

- [Inicio rápido](#-inicio-rápido)
- [Arquitectura](#️-arquitectura)
- [Organización del frontend](#-organización-del-frontend)
- [Matriz de riesgos](#-matriz-de-riesgos)
- [Seguridad de la demostración](#-seguridad-de-la-demostración)
- [Requisitos](#-requisitos)
- [Licencia](#-licencia)

---

## 🚀 Inicio rápido

1. Copia `.env.example` como `.env` si deseas cambiar las credenciales locales.
2. Ejecuta:

   ```bash
   docker compose up --build

Abre http://localhost:8080.

El backend queda disponible a través del proxy del frontend en /api.
PostgreSQL conserva sus datos en el volumen postgres_data.

Para explorar las tablas y registros desde el navegador, abre Prisma Studio en http://localhost:5555.
El puerto está limitado al equipo local.

🏗️ Arquitectura
Componente	Tecnologías
Frontend	React, Vite, TypeScript, Motion, Phosphor Icons
Backend	Express, TypeScript, Socket.IO, Prisma
Base de datos	PostgreSQL 16
Explorador de datos	Prisma Studio (puerto 5555)
📁 Organización del frontend
text
frontend/src/
├── App.tsx                          # composición y navegación
├── hooks/useSimulationController.ts # estado, API y Socket.IO
├── pages/                           # una pantalla por etapa del flujo
├── scenarios/                       # una simulación visual por escenario
├── components/                      # componentes reutilizables
├── config/                          # iconos e interacciones por escenario
├── api.ts                           # cliente HTTP
├── types.ts                         # contratos TypeScript
└── styles.css                       # sistema visual global
📊 Matriz de riesgos
Nivel	Probabilidad	Impacto	Puntuación
Bajo	1 – 4	1 – 5	1 – 4
Moderado	1 – 4	1 – 5	5 – 9
Alto	1 – 4	1 – 5	10 – 16
Crítico	1 – 4	1 – 5	17 – 20
Probabilidad: 1 a 4.

Impacto: 1 a 5.

Puntuación: probabilidad por impacto (rango 1 a 20).

🔒 Seguridad de la demostración
El formulario SQL no ejecuta texto proporcionado por el usuario.

El tráfico DDoS, las credenciales y los activos son datos ficticios administrados por una máquina de estados.

🧰 Requisitos
Docker y Docker Compose

Node.js 20+ (solo si ejecutas sin Docker)

PostgreSQL 16 (solo si ejecutas sin Docker)


