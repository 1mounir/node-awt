const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const verify =require("./server/routes/verify");
require('dotenv').config();
const userController = require("./server/controllers/userController");
var cookieParser = require('cookie-parser');

//const authentication =require("./server/userController.authentication");
const app = express();
const port = process.env.PORT || 5000;


// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// cookies
app.use(cookieParser());

// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');
//app.use(userController.login);
//app.use(userController.authentication);

// verify token before accessing api
//app.use(verify)
// Connection Pool
// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });



const routes = require('./server/routes/user');
app.use('/', routes);


app.listen(port, () => console.log(`Listening on port ${port}`));