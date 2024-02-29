FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["/express-backend/package.json", "/express-backend/package-lock.json*", "/express-backend/npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]