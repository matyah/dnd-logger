FROM node:alpine
ARG GITHUB_TOKEN=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

WORKDIR /app
COPY package.json .
COPY .npmrc .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]