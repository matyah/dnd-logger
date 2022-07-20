FROM node:alpine
ARG GITHUB_TOKEN=${GITHUB_TOKEN}

WORKDIR /app
COPY package.json .
COPY .npmrc .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]