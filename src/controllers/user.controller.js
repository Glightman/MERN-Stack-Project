const userService = require("../services/user.service")

const create = async (req, res) => {
    const {name, userName, email, password, avatar, background} = req.body;

    if (!name || !userName || !email || !password || !avatar || !background) {
        res.status(400).send({"message": "è preciso preemcher todos os campos"})
    }

    const user = await userService.create(req.body);
    if (!user){
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

module.exports = { create };