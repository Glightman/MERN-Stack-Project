const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name || !userName || !email || !password || !avatar || !background) {
        res.status(400).send({ "message": "è preciso preemcher todos os campos" })
    }

    const user = await userService.createService(req.body);
    if (!user) {
        return res.status(400).send({ message: "erro ao criar usuário" });
    }

    res.status(201).send({
        message: "Usuário criado com sucesso!",
        user: {
            id: user._id,
            name,
            userName,
            email,
            avatar,
            background
        }
    })
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400).send({ message: "não há usuários cadastrados" })
    }

    res.send(users)
}

const findById = async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: "ID de usuário inválido" })
    }

    const user = await userService.findByIdService(id)

    if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" })
    }

    res.send(user);
}

module.exports = { create, findAll, findById };