const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/main_admin";
const jwtSecret = process.env.JWT_SECRET;

/*
Middleware - Verificação de Login
*/
exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Nao Autorizado" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Nao Autorizado" });
  }
};

/*
GET / Admin - Pagina de Login
*/
exports.admin = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("admin/login", {
      locals,
      layout: adminLayout,
      currentRoute: "/admin",
    });
  } catch (error) {
    console.log(error);
  }
};

/*
POST / Admin - Verificacao de Login
*/
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Credenciais Invalidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status((401).json({ message: "Credenciais Invalidas" }));
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/*
POST / Admin - Pagina de Cadastro
*/
exports.cadastro = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "Crio usuario", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "Ja tem esse usuario" });
      }
      res.status(500).json({ message: "Internal Server error" });
    }
  } catch (error) {
    console.log(error);
  }
};

/*
GET / Admin - Logout
*/
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
