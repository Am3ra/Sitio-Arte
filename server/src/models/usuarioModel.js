const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema({
    nameUsuario : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true
    },
    social : {
        type : String,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required: true
    }
});

mongoose.pluralize(null);

const userModel = mongoose.model( 'usuarios', userSchema );

const Users = {
    verClientes : function() {
        return userModel
        .find()
        .then( todosLosClientes => {
            return todosLosClientes;
        })
        .catch( err => {
            return err;
        });
    }
}

module.exports = { Users };
