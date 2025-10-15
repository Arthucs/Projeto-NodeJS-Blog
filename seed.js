const Post = require('./app/models/post');
require('dotenv').config();
const connectDB = require('./config/dbConnection');

connectDB();

// Introducao de dados no DB
const seedData = [
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
    ];

(async () => {
  await Post.deleteMany();
  await Post.insertMany(seedData);
  console.log('Banco populado com dados iniciais');
  process.exit();
})();