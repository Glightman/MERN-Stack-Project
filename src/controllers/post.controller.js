import { createService, findAllService, countPost, topPostService } from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const { authorization } = req.headers
    console.log(authorization)

    if (!authorization) {
      return res.send(401)
    }


    const { title, text, banner } = req.body;

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
  try {
    let { limit, offset } = req.query

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 5
    }
    if (!offset) {
      offset = 0
    }

    const post = await findAllService(offset, limit)
    const total = await countPost()
    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    if (post.length === 0) {
      return res.status(400).send({ message: "não há nenhum post" })
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: post.map(item => ({
        id: item._id,
        tittle: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.userName,
        userAvatar: item.user.avatar
      }))
    })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topPost = async (req, res) => {
  try {
    const post = await topPostService()

    if (!post) {
      return res.status(400).send({ message: "Não há posts registrados" })
    }

    res.send({
      post: {
        id: post._id,
        tittle: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.userName,
        userAvatar: post.user.avatar
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

}

export { create, findAll, topPost };