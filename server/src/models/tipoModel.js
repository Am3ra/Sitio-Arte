const mongoose = require('mongoose');

const tipoSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    precioBase : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true 
    }
});

mongoose.pluralize(null);

const TipoCollection = mongoose.model( 'tipo', tipoSchema );

const Tipo = {
    verTipos : function(){
        return TipoCollection.find()
    },
    addNewTipo : function( newTipo ){
        return TipoCollection.create( newTipo )
    },
    deleteTipo : function( id ){
        return TipoCollection.deleteOne( {_id : id } )
    },
    modificarTipo : function(id, newName, newDes, newPrice){
        return TipoCollection.updateOne({_id : id}, {$set : {
            name: newName,
            description : newDes,
            precioBase: newPrice
        }})
    },
}

module.exports = { Tipo };