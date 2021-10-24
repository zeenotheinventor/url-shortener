# pull official base image
FROM node:15.0-alpine

# set working directory
WORKDIR /

# add `/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]