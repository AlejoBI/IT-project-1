FROM nginx:alpine
RUN apk add --no-cache nginx-mod-http-headers-more
COPY common.conf /etc/nginx/common.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80