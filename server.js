require("dotenv").config();

const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const connectDB = require("./config/dbConnection");
const { isActiveRoute } = require("./app/helpers/routeHelpers");

const app = express();
const PORT = process.env.PORT || 5000;

// Realizando conexao com DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(express.static("public"));

// Realizando "set" do 'express-ejs-layouts' e da 'view engine' como 'ejs'
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Configurando o path de views e public
app.set("views", path.join(__dirname, "app", "views"));
app.use(express.static(path.join(__dirname, "app", "public")));

app.locals.isActiveRoute = isActiveRoute;

app.use("/", require("./app/routes/main"));
app.use("/", require("./app/routes/admin"));

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
