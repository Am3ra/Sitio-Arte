const mongoose = require('mongoose');

const portafolioSchema = mongoose.Schema({
    nameImage : {
        type : String,
        required : false
    },
    link : {
        type : String,
        required : true
    },
    img: {
        type : String,
        required : true
    }
});

mongoose.pluralize(null);

const PortafolioCollection = mongoose.model( 'portafolio', portafolioSchema );

const Portafolio = {
    verPortafolio : function(){
        return PortafolioCollection.find()
    },
    addNewImage : function( newImage ){
        return PortafolioCollection.create( newImage )
    },
    deleteImage : function( id ){
        return PortafolioCollection.deleteOne( {_id : id } )
    },
    modificarImage : function(id, newLink){
        return PortafolioCollection.updateOne({_id : id}, {$set : {link : newLink}})
    },
}

module.exports = { Portafolio };