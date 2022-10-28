
const create = (req, res) => {
    const {name, userName, email, password, avatar, background} = req.body;

    if (!name || !userName || !email || !password || !avatar || !background) {
        res.status(400).send({"message": "è preciso preemcher todos os campos"})
    }

    

    res.status(201).send({
        message: "Usuário criado com sucesso!",
        user: {
            name,
            userName,
            email,
            avatar,
            background
        }
    })
};

module.exports = { create };