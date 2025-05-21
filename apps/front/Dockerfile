FROM starter/packages AS builder
ENV NODE_ENV=production

USER node
WORKDIR /app/front

COPY --chown=node:node . .
RUN npm install --save /app/packages/utils/ && \
    npm install --no-audit --no-fund --include prod --include dev  && \
    npm run build


# Live
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/front/dist /usr/share/nginx/html
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]