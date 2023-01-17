FROM node:19.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8080

ENV DEFAULT_LANG=en-US
ENV SIGNATURE=false
ENV TAG_STRUCTURE=v

CMD ["npm", "start"]