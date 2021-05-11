const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { Portafolio } = require('../models/portafolioModel')
const { Users } = require( '../models/usuarioModel' );
const { Comision } = require('../models/comisionModel');
const { Tipo } = require('../models/tipoModel');
const upload = require('../services/file-upload');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const singleUpload = upload.single('img');

router.use( jsonParser );

// Ruta para obtener todas las imagenes
router.get( '/galeria', ( req, res ) => {
    Portafolio
    .verPortafolio()
    .then( result => {
        return res.status( 200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para agregar una nueva imagen

router.post( '/addImage', singleUpload, ( req, res ) => {

    let { link } = req.body;
    let img = req.file.location;

    if(!link || !img){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newImage = { link, img }

    Portafolio
    .addNewImage( newImage )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    });
});

// Ruta para borrar una iamgen
router.delete('/borrarImagen/:id', ( req, res ) => {

    let id = req.params.id;

    if(!id){
        res.statusMessage = "Please send the product to delete";
        return res.status( 406 ).end()
    }
    Portafolio.deleteImage( id )
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That product was not found in the db";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para modificar el link de una iamgen
router.patch('/modificarImagen/:id', ( req, res ) => {
    let id = req.params.id;
    let newLink = req.body.link;

    if(!id || !newLink){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Portafolio
    .modificarImage(id, newLink)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no image with the given id";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para obtener todas las comisiones
router.get( '/comisiones', ( req, res ) => {
    Comision
    .verComisiones()
    .then( result => {
        return res.status( 200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para crear una nueva comision
router.post( '/crearComision', ( req, res ) => {

    let { name, contact, username, tipo, description } = req.body;

    if( !name || !contact || !username || !tipo || !description ){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    let token = uuidv4();
    let approved = false;
    let avance = 0;
    let completed = false;
    let comments = [];

    const newComision = { name, contact, username, tipo, description, token, approved, avance, completed, comments }
    console.log(newComision);

    Comision
    .addNewComision( newComision )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    });
});

// Ruta para modificar la descripcion de una comision
router.patch('/modificarComsion/:token', ( req, res ) => {
    let token = req.params.token;
    let newDes = req.body.description;

    if(!token || !newDes){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .modificarComisionDes(token, newDes)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no comision with the user passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para borrar alguna comision
router.delete('/borrarComision/:token', ( req, res ) => {

    let token = req.params.token;

    if(!token){
        res.statusMessage = "Please send the comision to delete";
        return res.status( 406 ).end()
    }
    Comision.deleteComision( token )
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That comision was not found in the db";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Rura para modificar el avance de una comision
router.patch('/modificarComsionAvance/:token', ( req, res ) => {
    let token = req.params.token;
    let newAvance = req.body.avance;

    if(!token || !newAvance){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .modificarComisionAvance(token, newAvance)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no comision with the token passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Rura para marcar como completada una comision
router.patch('/completedComision/:token', ( req, res ) => {
    let token = req.params.token;
    let newComp = req.body.completed;

    if(!token || !newComp){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .modificarComisionCompleted(token, newComp)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no comision with the token passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para obtener los tipos de comisiones
router.get( '/tipos', ( req, res ) => {
    Tipo
    .verTipos()
    .then( result => {
        return res.status( 200 ).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para crear un nuevo tipo
router.post( '/crearTipo', singleUpload, ( req, res ) => {
    
    let { name, description, precioBase } = req.body;
    let img = req.file.location;

    if(!name || !description || !precioBase ){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newTipo = { name, description, precioBase, img}

    Tipo
    .addNewTipo( newTipo )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        console.log(err)
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    });
});

// Ruta para eliminar un tipo
router.delete('/borrarTipo/:id', ( req, res ) => {

    let id = req.params.id;

    if(!id){
        res.statusMessage = "Please send the category to delete";
        return res.status( 406 ).end()
    }

    Tipo.deleteTipo( id )
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That category was not found in the DB";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para modificar la descripcion de un tipo
router.patch('/modificarTipo/:id', ( req, res ) => {
    let id = req.params.id;
    let { name: newName, description: newDesc, precioBase: newPrice } = req.body;

    if(!id || !newName || !newDesc || !newPrice){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Tipo
    .modificarTipo(id, newName, newDesc, newPrice)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no type with the id passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Somethong went wrong with the DB";
        return res.status( 500 ).end();
    })
});

module.exports = router;