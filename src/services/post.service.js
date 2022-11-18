import Post from "../models/Post.js";
import User from "../models/User.js";

const createService = (body) => Post.create(body);

const findAllService = () => Post.find()

/* 
const topNewsService = () => Post.findOne().sort({ _id: -1 }).populate("user");

const findPostByIdService = (id) => Post.findById(id).populate("user");

const countPosts = () => Post.countDocuments();

const searchPostService = (title) =>
  Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const findPostsByUserIdService = (id) => {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
};

const updatePostService = (id, title, banner, text) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    }
  );

const deletePostService = (id) => Post.findOneAndDelete({ _id: id });

const likesService = (id, userId) =>
  Post.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const likesDeleteService = (id, userId) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );

const commentsService = (id, message, userId) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

const commentsDeleteService = (id, userId, idComment) =>
  Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  ); */

export {
  createService,
  findAllService,
  
  /* 
  topNewsService,
  findPostByIdService,
  searchPostService,
  findPostsByUserIdService,
  updatePostService,
  deletePostService,
  likesService,
  likesDeleteService,
  commentsService,
  commentsDeleteService,
  countPosts, */
};