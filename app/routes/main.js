const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/*
GET / Home
*/
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Blog simples criado com NodeJS, Express e MongoDB.",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(10)
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
});

/*
GET / Sobre
*/
router.get("/sobre", (req, res) => {
  res.render("sobre", {
    currentRoute: "/sobre",
  });
});

/*
GET / Post : id
*/
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
});

/*
POST / Post - searchTerm
*/
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
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
});

// Testando introcao de dados no DB
/*
function insertPostData () {
    Post.insertMany([
        {
            title: "Construindo APIs com Node.js",
            body: "Aprenda a usar o Node.js para criar APIs RESTful utilizando frameworks como o Express.js."
        },
        {
            title: "Limitando o Tráfego de Rede no Node.js",
            body: "Aprenda como limitar o tráfego de rede."
        },
        {
            title: "Aprenda Morgan - Registrador de Requisições HTTP para Node.js",
            body: "Aprenda a usar o Morgan."
        },
        {
            title: "Crie Aplicações em Tempo Real e Baseadas em Eventos no Node.js",
            body: "Socket.io: Aprenda a usar o Socket.io para criar aplicações em tempo real e baseadas em eventos no Node.js."
        },
        {
            title: "Descubra como usar o Express.js",
            body: "Descubra como usar o Express.js, um popular framework web para Node.js, para criar aplicações web."
        },
        {
            title: "Entenda como trabalhar com MongoDB e Mongoose",
            body: "Entenda como trabalhar com MongoDB e Mongoose, uma biblioteca de Modelagem de Dados de Objetos (ODM), em aplicações Node.js."
        }
    ])
}
insertPostData();
*/

module.exports = router;
