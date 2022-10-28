const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("esperando conexão com o banco de dados");

    mongoose.connect("mongodb+srv://mernStack:testeteste@cluster0.aya3ovp.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("Mongodb conectado")).catch((error) => console.log(error));
};

module.exports = connectDatabase;