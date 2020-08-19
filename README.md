# :zap: Nodejs-Stock-Prices

* Node.js app to get stock price info from the [Financial Modeling Prep API](https://financialmodelingprep.com/) and store data in a MongoDB database as part of a FreeCodeCamp exercise for Front End Certification.

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [:zap: Nodejs-Stock-Prices](#zap-nodejs-stock-prices)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* Original instructions from FCC:

1) SET NODE_ENV to `test` without quotes and set DB to your mongo connection string
2) Complete the project in `routes/api.js` or by creating a handler/controller
3) You will add any security features to `server.js`
4) You will create all of the functional tests in `tests/2_functional-tests.js`

* MongoDB Cloud Atlas database set up using google cloud
* A different API was used from the one recommended to get stock price data : [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs/) was used.

## :camera: Screenshots

![Example screenshot](./images/stock.png).
![Example screenshot](./images/mongodb.png).

## :signal_strength: Technologies

* [Node v12](https://nodejs.org/en/) javaScript runtime built on Chrome's V8 JavaScript engine
* [mongoose v5](https://mongoosejs.com/) object modelling for node.js.
* [Helmet v3](https://helmetjs.github.io/) Express.js security with HTTP headers.
* [Cors v2](https://www.npmjs.com/package/cors) node.js package for providing Connect/Express middleware that can be used to enable CORS with various options.

## :floppy_disk: Setup

* Create MongoDB Atlas Cloud database (or local installed MongoDB database) and add user access/database credentials (USER_NAME, USER_PASSWORD, DB_CLUSTER & DB_NAME) to a new `.env` file. This is used in `server.js`.
* Add IP address to MongoDB Atlas Network Access whitelist. Or simply whitelist all (IP address 0.0.0.0/0).
* Run `node server.js` for a dev server. Navigate to `http://localhost:4000/`. The app will automatically reload if you change any of the source files.

## :computer: Code Examples

* extract from `server.js` to connect to MongoDB database

```javascript
// MongoDB Atlas Database Access Credentials
const dbUserName = process.env.USER_NAME;
const dbUserPass = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER
const dbUrl = `mongodb+srv://${dbUserName}:${dbUserPass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// MongoDB Database connection
mongoose.set('useFindAndModify', false);
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) {
      console.log('Database connection error: ' + err);
    } else {
      console.log(
        'Successful database connection to Mongoose Atlas database named: ',
        dbName
      );
    }
  }
);
```

## :cool: Features

* MongoDB cluster set up with username and password.

## :clipboard: Status & To-Do List

* Status: Working but can be improve
* To-Do: improve

## :clap: Inspiration

* [Financial Modeling Prep API Documentation](https://financialmodelingprep.com/developer/docs/)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
