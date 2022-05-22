//Load express package
const express = require('express');
const PORT = process.env.PORT || 3000;

//Instantiate the server
const app = express();

const { notes } = require('./Develop/db/db.json')

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());


//test adding route
app.get('/api/notes', (req, res) => {
    res.send('Hello!');
  });


//make our server listen on port 3000
app.listen(PORT, () => {
    console.log('API server now on port 3000');
})