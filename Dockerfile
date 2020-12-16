FROM vuejs/ci

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# install project dependencies
RUN npm install npm@7 || true
RUN npm install || true

# build app for production with minification
#RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "dev" ]
