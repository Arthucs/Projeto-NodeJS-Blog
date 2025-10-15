const Post = require("../models/post");

/*
GET / Home
*/
exports.home = async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Blog feito com NodeJs, Express & MongoDb.",
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(5)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const prePage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prePage: null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

/*
GET / Sobre
*/
exports.sobre = (req, res) => {
  res.render("sobre", {
    currentRoute: "/sobre",
  });
};

/*
GET / Post : id
*/
exports.postId = async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Blog feito com NodeJs, Express & MongoDb.",
    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
};

/*
POST / Post - searchTerm
*/
exports.searchTerm = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Blog feito com NodeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("searchResult", { locals, data, currentRoute: "/search" });
  } catch (error) {
    console.log(error);
  }
};
