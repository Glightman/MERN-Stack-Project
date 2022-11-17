import userService from "../services/user.service.js";
import mongoose from 'mongoose';


/* ==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/ */
const create = async (req, res) => {
    try {
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
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

/* ==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/ */
const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "não há usuários cadastrados" })
        }

        res.send(users)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/* ==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/ */
const findById = async (req, res) => {

    try {
        const user = req.user;

        res.send(user);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/* ==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/ */
const update = async (req, res) => {
    try {
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

        res.send({ message: "Usuário atualizado com sucesso" })
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default { create, findAll, findById, update };