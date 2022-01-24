#Import nodejs image
FROM node:erbium

WORKDIR /app
 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6227

CMD ["npm", "start"]