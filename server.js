//Load express package
const express = require('express');

const PORT = process.env.PORT || 3000;

//Instantiate the server
const app = express();




app.listen(PORT, () => {
    console.log('API server now on port 3000');
})