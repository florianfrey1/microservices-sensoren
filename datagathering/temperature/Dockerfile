FROM node:alpine
WORKDIR /co2
COPY package.json package.json
RUN npm install
COPY ./ ./
CMD ["npm", "start"]