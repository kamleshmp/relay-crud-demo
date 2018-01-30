## Getting Started

Install watchmon to change the changes "https://medium.com/@vonchristian/how-to-setup-watchman-on-ubuntu-16-04-53196cc0227c"

Then:

```sh
$ npm install
```

Go to the server directory then: 

```sh
cd server/data

$ npm install
```

NOTE: Update the postgres database name, usename and password in the index.js and config.json under server/data/config:

To Generate database go to cd server/data then:

```sh
$ node_modules/.bin/sequelize db:create
```

To migrate database go to cd server/data then:

```sh
$ node_modules/.bin/sequelize db:migrate
```

Start the local dev server:

```sh
$ npm start
```
Navigate to **http://localhost:3000/** to view the app