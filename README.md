# Ecommerce Server

## Global prerequisites

* Install Node.js:
https://nodejs.org/en/download/

* Install yarn:
npm install --global yarn
If something goes wrong:
https://classic.yarnpkg.com/lang/en/docs/install/


## Server
Database location: `/usr/local/var/mongodb`
Config location: `/usr/local/etc/mongod.conf`

* To run the server:
`cd ./server && yarn install`
* Start DB:
Windows: `sudo mongod --config /usr/local/etc/mongod.conf`
Mac OS : `sudo mongod --config <mongodb install directory>/bin/mongod.cfg`
* Run server:
`yarn watch-node`

## Store
* Go to directory & intall dependencies:
`cd ./client && yarn install`
* Run client:
`yarn start:local`

## Admin
* Go to directory & intall dependencies:
`cd ./admin && yarn install`
* Run client:
`yarn start:local`