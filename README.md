# Blog com NodeJS

Blog simples que utilizando NodeJS, Express e MongoDB. O objetivo de projeto foi estudar o uso de MongoDB e praticar o desenvolvimento web.
Tendo o estudo como finalidade, o blog não possui todas as funcionalidades que um blog real teria.

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)

---

## Instruções para execução

### 1. Clone o repositório
```bash
git clone https://github.com/Arthucs/Projeto-NodeJS-Blog.git
```

### 2. Instalar Dependências
```bash
npm install bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose
```
```bash
npm install nodemon --save-dev
```

### 3. Configurar Banco de dados com MongoDB
- Crie um banco de dados com MongoDB atavés do [site oficial](https://www.mongodb.com/) ou outro método.
- Substitua os atributos do arquivo ".env.example" respectivamente pela URI de seu DB, e pelo "secret" que desejar.
-    

### 4. Popule o DB e execute o servidor
```bash
node seed.js 
```
```bash
npm start
```
A aplicação estatá disponível em: ***http://localhost:5000/***
Se necessário, a porta pode ser alterada no arquivo "server.js".