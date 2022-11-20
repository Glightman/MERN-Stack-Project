import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (offset, limit) => Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countPost = () => Post.countDocuments()

const topPostService = () => Post.findOne().sort({ _id: -1 }).populate("user")

const findByIdService = (id) => Post.findById(id).populate("user")

const searchByTitleService = (title) =>
  Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const byUserService = (id) => Post.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateService = (id, title, text, banner) =>
  Post.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    {
      rawResult: true,
    });

const eraseService = (id) => Post.findByIdAndDelete({ _id: id });

const likePostService = (idPost, userId) =>
  Post.findOneAndUpdate(
    { _id: idPost, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikePostService = (idPost, userId) =>
  Post.findOneAndUpdate({ _id: idPost }, { $pull: { likes: { userId } } });

export {
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
};

/* teste */