  
const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    img: {
        data: Buffer,
        contentType: String,
        required : true
    }
});

mongoose.pluralize(null);

const PortfolioCollection = mongoose.model( 'Portfolios', portafolioSchema );

const Portfolios = {
    addNewImage : function( newImage ){
        return PortfolioCollection
        .create( newImage )
        .then( createdImage => {
            return createdImage;
        })
        .catch( err => {
            return err;
        });
    },
    verPortfolio : function(){
        return PortfolioCollection
        .find()
        .then( galeria => {
            return galeria;
        })
        .catch( err => {
            return err;
        });
    }
}