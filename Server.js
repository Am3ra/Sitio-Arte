
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rutas = require('./server/src/routes/routes.js');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config()


// Init
const app = express();

app.use(cors());

// Routes
app.use('/', rutas );

//app.use('/uploads', express.static('uploads'));
app.use(session({
    secret: 'lelemoonn',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen( 8000, () => {
  console.log( 'Sever on port ', 8000);

  const settings = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
};

new Promise( (resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URL, settings, ( err ) => {
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
