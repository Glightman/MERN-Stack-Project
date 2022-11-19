import {
  createService,
  findAllService,
  countPost,
  topPostService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
} from "../services/post.service.js";

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

const findById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await findByIdService(id)
    return res.send({
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

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const post = await searchByTitleService(title);

    if (post.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe nenhum post com esse titulo" });
    }

    return res.send({
      results: post.map((post) => ({
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.userName,
        userAvatar: post.user.avatar,
      })),
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const post = await byUserService(id);

    return res.send({
      results: post.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.userName,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !banner && !text) {
      res.status(400).send({
        message: "Submit at least one field to update the post",
      });
    }

    const post = await findByIdService(id);

    if (String(post.user._id) !== req.userId) {
      return res.status(400).send({
        message: "You didn't update this post",
      });
    }

    await updateService(id, title, text, banner);

    return res.send({ message: "Post successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await findByIdService(id);

    if (String(post.user._id) !== req.userId) {
      return res.status(400).send({
        message: "You didn't delete this post",
      });
    }

    await eraseService(id);

    return res.send({ message: "post deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  create,
  findAll,
  topPost,
  findById,
  searchByTitle,
  byUser,
  update,
  erase
};