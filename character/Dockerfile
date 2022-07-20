FROM node:alpine
ARG GITHUB_TOKEN=${GITHUB_TOKEN}

WORKDIR /app
COPY package.json .
RUN printf "@matyah:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]