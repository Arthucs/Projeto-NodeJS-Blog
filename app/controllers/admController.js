const Post = require("../models/post");
const adminLayout = "../views/layouts/main_admin";

/*
GET / Admin - Dashboard
*/
exports.dashboard = async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const data = await Post.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
      currentRoute: "/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/*
GET / Admin - Criar Post
*/
exports.addPost = async (req, res) => {
  try {
    const locals = {
      title: "Criar Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const data = await Post.find();
    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
      currentRoute: "/add-post",
    });
  } catch (error) {
    console.log(error);
  }
};

/*
POST / Admin - Adicionar Post Criado ao DB
*/
exports.addPostDB = async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
      });

      await Post.create(newPost);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

/*
GET / Admin - Editar Post
*/
exports.editPost = async (req, res) => {
  try {
    const locals = {
      title: "Editar Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit-post", {
      locals,
      data,
      layout: adminLayout,
      currentRoute: null,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
PUT / Admin - Atualizar Post
*/
exports.attPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

/*
DELETE / Admin - Deletar Post
*/
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
