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

    const user = req.user;

    res.send(user);
}

const update = async (req, res) => {
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name && !userName && !email && !password && !avatar && !background) {
        res.status(400).send({ message: "è preciso preencher pelo menos um campo para realizar uma atualização" })
    }

    const id = req.id;

    const user = req.user;

    await userService.updateService(
        id,
        name,
        userName,
        email,
        password,
        avatar,
        background
    );

    res.send({ message: "Usuário atualizado com sucesso" });
};

module.exports = { create, findAll, findById, update };