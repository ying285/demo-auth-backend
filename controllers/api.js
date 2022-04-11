const Api = require("../models/api");

exports.getApi = async (req, res) => {
  try {
    const posts = await Api.find();
    const PostLength = posts.length;
    let randomNumber = Math.floor(Math.random() * PostLength + 1);
    const post = posts[randomNumber];

    if (post === undefined) {
      res.status(200).json(posts[0]);
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    const error = new Error(err);
    error.code = 400;
    throw error;
  }
};

exports.addPost = async (req, res) => {
  const content = req.body.content;
  const title = req.body.title;
  try {
    const api = new Api({
      title: title,
      content: content,
    });
    await api.save();
    res.status(200).json({ message: "signup successfully" });
  } catch (err) {
    const error = new Error(err);
    error.code = 400;
    throw error;
  }
};
