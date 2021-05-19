const mongoose = require('mongoose');

const comisionSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    username: {
        type : String,
        required : true
    },
    tipo: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    token: {
        type : String,
        required : true
    },
    approved: {
        type: Boolean,
        required: true
    },
    avance: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    comments: {
        type: [String],
        required: true
    },
    archivos: {
        type: [String],
        required: true
    }
});

mongoose.pluralize(null);

const ComisionCollection = mongoose.model( 'comision', comisionSchema );

const Comision = {
    verComisiones : function(){
        return ComisionCollection
        .find()
        .then( comisiones => {
            return comisiones;
        })
        .catch( err => {
            throw err;
        });
    },
    verComisionesAprobadas : function(){
        return ComisionCollection
        .find( { approved: {$eq: true}})
        .then( comisiones => {
            return comisiones;
        })
        .catch( err => {
            throw err;
        });
    },
    verComisionesEnProgreso : function(){
        return ComisionCollection
        .find( { avance : {$lt : 100}})
        .then( comisiones => {
            return comisiones;
        })
        .catch( err => {
            throw err;
        });
    },
    addNewComision : function( newComision ){
        return ComisionCollection
        .create( newComision )
        .then( crearedComision => {
            return crearedComision;
        })
        .catch( err => {
            throw err;
        });
    },
    deleteComision : function( token ){
        return ComisionCollection
        .deleteOne( {token : token } )
        .then( results =>{
            return results;
        })
        .catch( err => {
            throw err;
        });
    },
    modificarComisionDes : function(token, newDes){
        return ComisionCollection
        .updateOne({token : token}, {$set : {description : newDes}})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        });
    },
    getComisionByToken : function( token ){
        return ComisionCollection
        .find( {token : token})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    },
    modificarComisionAvance : function( token, newAvance ){
        return ComisionCollection
        .updateOne({token : token}, {$set : {avance : newAvance}})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    },
    modificarComisionCompleted : function( token, newComp ){
        return ComisionCollection
        .updateOne({token : token}, {$set : {completed : newComp}})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    },
    approveComision : function( token, newApprove ){
        return ComisionCollection
        .updateOne({token : token}, {$set : {approved : newApprove}})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    },
    addComment : function( token, newComment ) {
        return ComisionCollection
        .updateOne(
            { token: token }, 
            { $push: { comments: newComment }})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    },
    addArchivo : function( token, newArchivo ) {
        return ComisionCollection
        .updateOne(
            { token: token }, 
            { $push: { archivos: newArchivo }})
        .then( results => {
            return results;
        })
        .catch( err => {
            throw err;
        })
    }
}

module.exports = { Comision };