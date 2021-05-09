FROM node:12.18.4-alpine3.12 as angular-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g --only=dev
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN ng build --prod

FROM nginx:alpine
COPY --from=angular-builder /app/dist/app /opt/ui
COPY deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deployment/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp
EXPOSE 443/tcp
