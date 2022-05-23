//Load express package
const express = require('express');
const path = require('path');


//Instantiate the server
const app = express();
const PORT = process.env.PORT || 5000;

const {notes} = require('./Develop/db/db.json')

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());

//makes all of the front-end code accessible without having a specify server endpoint created
app.use(express.static('./Develop/public'));



//returns all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });


//HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});


 //any route that wasn't previously defined will receive the homepage as a response
//should always come last 
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});



//make our server listen on port 5000
app.listen(PORT, () => {
    console.log('API server now on port ' + PORT);
})