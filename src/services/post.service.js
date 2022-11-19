import Post from "../models/Post.js";
import User from "../models/User.js";

const createService = (body) => Post.create(body);

const findAllService = (offset, limit) => Post.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countPost = () => Post.countDocuments()

export {
  createService,
  findAllService,
  countPost,
};