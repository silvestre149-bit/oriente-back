FROM node:lts-alpine

WORKDIR /usr/app

ENV NODE_ENV=production
COPY package*.json ./

#RUN npm install --silent --progress=false 
RUN npm install

#COPY ./src ./src
#COPY ./config ./config
COPY . ./

CMD ["npm","start"]
