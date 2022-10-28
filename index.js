const express = require('express')
const userRoute = require('./src/routes/user.route')
const app = express();
const connectDatabase = require("./src/database/db")

app.use(express.json());

connectDatabase()

app.use("/user", userRoute);

app.listen(3000, () => console.log('Servidor funcionando na porta http://localhost:3000'));