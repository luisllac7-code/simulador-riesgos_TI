#!/bin/sh
set -e
npx prisma migrate deploy
node dist/prisma/seed.js
node dist/src/server.js

