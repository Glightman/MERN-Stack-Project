import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log("esperando conexão com o banco de dados");

    mongoose.connect( process.env.MONGODB_URI ,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("Mongodb conectado")).catch((error) => console.log(error));
};

export default connectDatabase;