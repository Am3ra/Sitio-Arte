const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { Portafolio } = require('../models/portafolioModel');
const { Comision } = require('../models/comisionModel');
const { Tipo } = require('../models/tipoModel');
const { Tienda } = require('../models/tiendaModel');
const upload = require('../services/file-upload');
const Admin = require('../models/adminModel');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "lelebot@outlook.com",
        pass: "lelemoon1234"
    }
});


const passport = require('passport');

const singleUpload = upload.single('img');

router.use( jsonParser );

///////////////// RUTAS PORTAFOLIO //////////////////////
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
        res.statusMessage =  "Something went wrong with the DB";
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

///////////////// RUTAS ADMIN //////////////////////
router.post('/admin', passport.authenticate('local', {
    successRedirect: '/admin/portafolio',
    failureRedirect: '/admin'
}));

///////////////// RUTAS COMISIONES //////////////////////
// Ruta para obtener todas las comisiones con todos (para admin)
router.get( '/comisionesPrivileged', ( req, res ) => {
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
    let avance = 0;
    let status = "Pending";
    let comments = [];
    let archivos = [];

    const newComision = { name, contact, username, tipo, description, token, status, avance, comments, archivos }
    console.log(newComision);

    Comision
    .addNewComision( newComision )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    });
});

// Ruta para modificar la descripcion de una comision
router.patch('/modificarComision/:id', ( req, res ) => {
    let id = req.params.id;

    let { description: newDes, token } = req.body;

    if(!token || !newDes){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .modificarComisionDes(id, token, newDes)
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para borrar alguna comision
router.delete('/borrarComision/:id', ( req, res ) => {

    let id = req.params.id;

    if(!id){
        res.statusMessage = "Please send the comision to delete";
        return res.status( 406 ).end()
    }
    Comision.deleteComision( id )
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Rura para modificar el avance de una comision
router.patch('/modificarComisionAvance/:id', ( req, res ) => {
    let id = req.params.id;
    let { avance: newAvance, token }= req.body;

    if(!token || !newAvance){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .modificarComisionAvance(id, token, newAvance)
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Rura para marcar como completada una comision
router.patch('/changeComStatus/:id', ( req, res ) => {
    let id = req.params.id;
    let { status: newStatus, token} = req.body;

    if(!token || !newStatus){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .changeStatus(id, token, newStatus)
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para agregar un comentario a la comision
router.patch('/changeContactInfo/:id', ( req, res ) => {
    let id = req.params.id;
    let { name: newName, contact: newContact, username: newUsername, token } = req.body;

    if(!token || !newName || !newContact || !newUsername ){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .changeContactInfo(id, token, newName, newContact, newUsername )
    .then( results => {
        return res.status( 202 ).end();
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

router.patch('/addComment/:id', ( req, res ) => {
    let id = req.params.id;
    let { comment, user, token } = req.body

    if(!token || !comment || !user){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    let newComment = { user : user, comment : comment }

    Comision
    .addComment(token, newComment)
    .then( results => {
        return res.status( 202 ).end();
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

router.patch('/addArchivo/:id', singleUpload, ( req, res ) => {
    let id = req.params.id;

    let { token } = req.body;
    let newArchivo = req.file.location;

    if(!token || !newArchivo){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Comision
    .addArchivo(id, token, newArchivo)
    .then( results => {
        return res.status( 202 ).json(newArchivo);
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

router.get( '/comisionesStatus/:status', ( req, res ) => {

    let status = req.params.status;

    Comision
    .verComisionesStatus( status )
    .then( result => {
        const filtered = result.map(({_id, name, tipo, status, avance, comments}) => ({
            _id,
            name,
            tipo,
            status,
            avance,
            hasComments: !!comments && comments.length > 0
        }))
        return res.status(200).json( filtered );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

router.post('/showComission/:id', (req, res) => {
    const id = req.params.id;
    const { token } = req.body

    if (!token) {
        return res.status( 401 ).end();
    }

    Comision.getComisionById(id, token)
    .then( result => {
        return res.status(200).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});


///////////////// RUTAS TIPO //////////////////////
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
        res.statusMessage =  "Something went wrong with the DB";
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
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

///////////////// RUTAS TIENDA //////////////////////
// Ruta para obtener todos los items de tienda
router.get( '/tienda', ( req, res ) => {
    Tienda
    .verTienda()
    .then( result => {
        return res.status( 200 ).json( result );
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// Ruta para mandar mail a la artista de una compra
router.post('/tienda/reciboCompra', ( req, res ) => {

    let { email } = req.body;

    var options = {
        from: "lelebot@outlook.com",
        to: "lelemoonn@gmail.com",
        subject: "Lelemoon Store automated message",
        text: "Una compra ha sido realizada por " + email
    };

    transporter.sendMail(options, function(err, info)
    {
        if (err)
        {
            console.log(err);
            res.statusMessage = "Error sending mail"
            return res.status( 406 );
        }
        console.log("Sent: " + info.response);
    });
    return res.status( 200 );
})

// Ruta para agregar un item a tienda
router.post( '/crearItem', singleUpload, ( req, res ) => {
    
    let { titulo, categoria, precio } = req.body;
    let img = req.file.location;
    let status = 'available';

    if(!titulo || !categoria || !precio ){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    const newItem = { titulo, categoria, precio, img, status}

    Tienda
    .addNewItem( newItem )
    .then( results => {
        return res.status( 201 ).json( results );
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    });
});

// Ruta para borrar un item
router.delete('/borrarItem/:id', ( req, res ) => {

    let id = req.params.id;

    if(!id){
        res.statusMessage = "Please send the item to delete";
        return res.status( 406 ).end()
    }
    Tienda.deleteItem( id )
    .then( result => {
        if(result.deletedCount > 0){
            return res.status( 200 ).end();
        }
        else{
            res.statusMessage = "That item was not found in the db";
            return res.status( 404 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

router.patch('/modificarStatus/:id', ( req, res ) => {
    let id = req.params.id;
    let newStatus = req.body.status;

    if(!id || !newStatus){
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Tienda
    .modificarStatus(id, newStatus)
    .then( results => {
        if(results.nModified > 0){
            return res.status( 202 ).end();
        }
        else{
            res.statusMessage = "There is no item with the id passed";
            return res.status( 409 ).end();
        }
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});

// RUTA ADMIN
/*
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/galeria',
    failureRedirect: '/admin'

}))
*/


router.post('/admin/login', async (req, res) => {
    let { email, password } = req.body;

    const admin = await Admin.findOne({email: email});

    if (!admin)
    {
        res.statusMessage = "No admin found with that email";
        return res.status( 406 ).end();
    }
    else
    {
        const match = await admin.matchPassword(password);

        if (match)
        {
            let token = {"token": "lelemoonn"}
            return res.status( 200 ).json(token);
        }
        else
        {
            res.statusMessage = "Wrong password";
            return res.status( 406 ).end();
        }
    }
})


router.patch('/changeItem/:id', ( req, res ) => {
    let id = req.params.id;
    let { titulo: newTitulo, categoria: newCate, precio: newPrecio } = req.body;

    if(!id || !newTitulo || !newCate || !newPrecio ){
		console.log(req.params.id)
        res.statusMessage = "Please send all the fields required";
        return res.status( 406 ).end()
    }

    Tienda
    .modificarItem(id, newTitulo, newCate, newPrecio )
    .then( results => {
        return res.status( 202 ).end();
    })
    .catch( err => {
        res.statusMessage =  "Something went wrong with the DB";
        return res.status( 500 ).end();
    })
});



module.exports = router;