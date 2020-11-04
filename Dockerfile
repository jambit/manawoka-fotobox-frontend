FROM nginx:alpine
COPY ./nginx-config/default.conf /etc/nginx/conf/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/manawoka-fotobox-frontend ./usr/share/nginx/html/
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
