import { createService, findAllService } from "../services/post.service.js"; 

const create = async (req, res) => {
  try {
    const { authorization } = req.headers
    console.log(authorization)

    if (!authorization) {
      return res.send(401)
    }


    const { title, text, banner} = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Preencha todos os campos para publicar",
      });
    }

    await createService({
      title,
      banner,
      text,
      user: req.userId,
    });

    return res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const findAll = async (req, res) => {
  const post = await findAllService()
  if (post.length === 0) {
    return res.status(400).send({ message: "não há nenhum post" })
  }
  res.send(post)
};

export {create, findAll};