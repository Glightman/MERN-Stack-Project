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
  likePostService,
  deleteLikePostService,
  addCommentService,
  deleteCommentService
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

    return res.status(201).send({
      message: "Notícia postada com sucesso!",
      new: {
        title,
        text,
        banner
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message, motivo: 'foi aqui' });
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

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const postLiked = await likePostService(id, userId);

    if (!postLiked) {
      await deleteLikePostService(id, userId);
      return res.status(200).send({ message: "Like successfully removed" });
    }

    res.send({ message: "Like done successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Escreva algo para comentar!" });
    }

    await addCommentService(id, comment, userId);  

    res.send({
      message: "Comment successfully completed!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { idPost, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(
      idPost,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (commentFinder.userId !== userId) {
      return res.status(400).send({ message: "You can't delete this comment" });
    }

    res.send({
      message: "Comment successfully removed!",
    });
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
  erase,
  likePost,
  addComment,
  deleteComment
}; 