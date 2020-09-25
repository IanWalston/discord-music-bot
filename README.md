

# How to set up the development environment

* clone git repo into local environment
* get the config file with proper ids and secrets and put it in `/config/config.js`
* run `npm i` to install dependencies
* run `npm start` to start the bot


### continuous  development

Using this method instead of `npm start` will cause the bot to be updated live as you develop without the need to restart it.

* install the node package nodemon in your local environment: `npm i -g nodemon`
* run `npm run dev`
