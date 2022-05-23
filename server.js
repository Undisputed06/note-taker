//Load express package
const express = require('express');
const path = require('path');
const fs = require('fs');


//Instantiate the server
const app = express();
const PORT = process.env.PORT || 3001;

const {notes} = require('./Develop/db/db.json')

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json());

//makes all of the front-end code accessible without having a specify server endpoint created
app.use(express.static('./Develop/public'));

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, "./Develop/db/db.json"),
      JSON.stringify({notes: notesArray}, null, 2)
    );
    return note ;
  }

function removeNote(id, notesArray){
    for(i =0; i < notesArray.length; i ++){
        let note = notesArray[i];

        if(note.id == id){
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, "./Develop/db/db.json"),
                JSON.stringify({notes: notesArray}, null, 2)
              );
              break;
        }

    }
}
  

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

app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
      res.json(note);
    
  });

  app.delete('/api/notes/:id', (req, res) => {
      newNotes = removeNote(req.params.id, notes)
      res.json(newNotes);
  })


//make our server listen on port 5000 or env port
app.listen(PORT, () => {
    console.log('API server now on port ' + PORT);
})