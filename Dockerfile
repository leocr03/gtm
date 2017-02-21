FROM node:argon

RUN npm install --global nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD ./app /usr/src/app
WORKDIR /usr/src/app


EXPOSE 8000

#VOLUME ./app:/usr/src/app

#CMD ["nodemon", "-L", "/usr/src/app"]
CMD [ "npm", "start" ]


