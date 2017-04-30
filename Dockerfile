FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
RUN ln -sf /usr/src/app /usr/src/temp
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD ./app /usr/src/app

EXPOSE 8000

CMD [ "npm", "start" ]


