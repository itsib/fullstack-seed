FROM fullstack/packages AS builder
ENV NODE_ENV=production

USER node
WORKDIR /app/server

COPY --chown=node:node . .

RUN npm install --save /app/packages/utils/ && \
    npm ci  && \
    npm run build && \
    npm prune --omit=dev


FROM node:22-alpine AS production
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app/server

COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules/ ./node_modules/
COPY --from=builder /app/server/dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]