FROM node:21.7.3
WORKDIR /usr/src/service-product-search
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
