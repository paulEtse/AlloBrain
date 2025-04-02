FROM node:18

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 7173

CMD ["npm", "run", "dev", "--", "--host", "--port", "7173"]
