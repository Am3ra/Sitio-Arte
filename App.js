const express = require('express');
const mongoose = require('mongoose');
const rutas = require('./scr/routes/routes');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const { Users } = require('./scr/models/usuarioModel');

// Init
const app = express();
// Routes
app.use('/', rutas );

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
});

app.listen( 8080, () => {
  console.log( 'Sever on port ', 8080);

  const settings = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
};

new Promise( (resolve, reject) => {
    mongoose.connect( 'mongodb+srv://admi:LabWeb2021@sitiodearte.nlsjt.mongodb.net/artedb?retryWrites=true&w=majority', settings, ( err ) => {
        if ( err ){
            reject( err );
        }
        else{
            console.log( "Database connected successfully." );
            return resolve();
        }
    })
})
.catch( err =>{
    mongoose.disconnect();
    console.log( err );
});
});
 
