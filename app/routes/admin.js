const express = require("express");
const router = express.Router();
const authCtrlr = require("../controllers/authController");
const admCtrlr = require("../controllers/admController");

/*
GET / Admin - Pagina de Login
*/
router.get(
    "/admin", 
    authCtrlr.admin
);

/*
POST / Admin - Verificacao de Login
*/
router.post(
    "/admin",
    authCtrlr.adminLogin
);

/*
GET / Admin - Dashboard
*/
router.get(
    "/dashboard",
    authCtrlr.authMiddleware,
    admCtrlr.dashboard
);

/*
GET / Admin - Criar Post
*/
router.get(
    "/add-post",
    authCtrlr.authMiddleware,
    admCtrlr.addPost
);

/*
POST / Admin - Adicionar Post Criado ao DB
*/
router.post(
    "/add-post",
    authCtrlr.authMiddleware,
    admCtrlr.addPostDB
);

/*
GET / Admin - Editar Post
*/
router.get(
    "/edit-post/:id",
    authCtrlr.authMiddleware,
    admCtrlr.editPost
);

/*
PUT / Admin - Atualizar Post
*/
router.put(
    "/edit-post/:id",
    authCtrlr.authMiddleware,
    admCtrlr.attPost
);

/*
POST / Admin - Pagina de Cadastro
*/
router.post(
    "/cadastro",
    authCtrlr.cadastro
);

/*
DELETE / Admin - Deletar Post
*/
router.delete(
  "/delete-post/:id",
  authCtrlr.authMiddleware,
  admCtrlr.deletePost
);

/*
GET / Admin - Logout
*/
router.get(
    "/logout",
    authCtrlr.authMiddleware,
    authCtrlr.logout
);

module.exports = router;
