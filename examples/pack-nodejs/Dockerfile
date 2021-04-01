FROM node:12-alpine as build
WORKDIR  /build
COPY . .
RUN set -ex; npm ci \
&& npm run lint \
&& npm run test \
&& npm run build \
&& rm -rf node_modules && rm -rf src \
&& cp ./package-lock.json ./dist \
&& cd ./dist \
&& npm ci --only=production \
# why the node_modules is in the parent dir?
&& mv ../node_modules . \
&& cd -

FROM node:12-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/dist .
ENTRYPOINT [ "node", "./main.js" ]
EXPOSE 7001
