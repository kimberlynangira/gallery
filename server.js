const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config'); // Add this line
const environment = process.env.NODE_ENV || 'development'; // Add this line
const mongoURI = config.mongoURI[environment];

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=> {
if (err){
    console.log(err);
    } else {
    console.log(`Connected to Database: ${mongoURI}`);
    }
});

// test if the database has connected successfully
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Database connected successfully')
})

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});