FROM nginx:1.27-alpine

# Utiliza o bundle pre-compilado (dist/) para evitar alto consumo de RAM/Swap do Three.js na VPS
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
