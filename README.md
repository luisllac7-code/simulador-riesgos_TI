# Simulador-riesgos_TI

Simulador educativo de riesgos y resiliencia de servicios TI. Representa escenarios ficticios de phishing, inyeccion SQL, DDoS y fallas fisicas sin ejecutar ataques reales.

Inicio rapido
Copia .env.example como .env si deseas cambiar las credenciales locales.
Ejecuta:
docker compose up --build
Abre http://localhost:8080.
El backend queda disponible a traves del proxy del frontend en /api. PostgreSQL conserva sus datos en el volumen postgres_data.

Para explorar las tablas y registros desde el navegador, abre Prisma Studio en http://localhost:5555. El puerto esta limitado al equipo local.

Arquitectura
Frontend: React, Vite, TypeScript, Motion y Phosphor Icons.
Backend: Express, TypeScript, Socket.IO y Prisma.
Base de datos: PostgreSQL 16.
Explorador de datos: Prisma Studio en el puerto 5555.
Organizacion del frontend
frontend/src/
├── App.tsx                         # composicion y navegacion
├── hooks/useSimulationController.ts # estado, API y Socket.IO
├── pages/                          # una pantalla por etapa del flujo
├── scenarios/                      # una simulacion visual por escenario
├── components/                     # componentes reutilizables
├── config/                         # iconos e interacciones por escenario
├── api.ts                          # cliente HTTP
├── types.ts                        # contratos TypeScript
└── styles.css                      # sistema visual global
Matriz de riesgos
Probabilidad: 1 a 4.
Impacto: 1 a 5.
Puntuacion: probabilidad por impacto, con un rango de 1 a 20.
Bajo: 1 a 4; Moderado: 5 a 9; Alto: 10 a 16; Critico: 17 a 20.
Seguridad de la demostracion
El formulario SQL no ejecuta texto proporcionado por el usuario. El trafico DDoS, las credenciales y los activos son datos ficticios administrados por una maquina de estados.
