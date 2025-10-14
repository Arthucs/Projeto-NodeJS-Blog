const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/main_admin';
const jwtSecret = process.env.JWT_SECRET;

/*
Middleware - Verificação de Login
*/
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Nao Autorizado' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId
        next();
    } catch (error) {
        res.status(401).json({ message: 'Nao Autorizado' });
    }
}


/*
GET / Admin - Pagina de Login
*/
router.get('/admin', async (req, res) => {
    try {
        const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('admin/login', { locals, layout: adminLayout, currentRoute:'/admin' });
    } catch (error) {
        console.log(error); 
    }

});


/*
POST / Admin - Verificacao de Login
*/
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais Invalidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status((401).json({ message: 'Credenciais Invalidas' }));
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});

        res.redirect('/dashboard');


    } catch (error) {
        console.log(error); 
    }
});


/*
GET / Admin - Dashboard
*/
router.get('/dashboard', authMiddleware, async (req, res) => {
    
    try {
        const locals = {
        title: "Dashboard",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        const data = await Post.find();
        res.render('admin/dashboard', { 
            locals, 
            data,
            layout: adminLayout,
            currentRoute: '/dashboard'
        });

    } catch (error) {
        console.log(error);
    }
});


/*
GET / Admin - Criar Post
*/
router.get('/add-post', authMiddleware, async (req, res) => {
    
    try {
        const locals = {
        title: "Criar Post",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        const data = await Post.find();
        res.render('admin/add-post', { 
            locals, 
            layout: adminLayout,
            currentRoute: '/add-post'
        });

    } catch (error) {
        console.log(error);
    }
});


/*
POST / Admin - Adicionar Post Criado ao DB
*/
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post ({
            title: req.body.title,
            body: req.body.body
        });

        await Post.create(newPost);
        res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
});


/*
GET / Admin - Editar Post
*/
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    
    try {
        const locals = {
        title: "Editar Post",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        const data = await Post.findOne({_id: req.params.id});
        res.render('admin/edit-post', { 
            locals,
            data, 
            layout: adminLayout,
            currentRoute: null
        });

    } catch (error) {
        console.log(error);
    }
});


/*
PUT / Admin - Atualizar Post
*/
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    
    try {

     await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
     });

     res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
});



/*
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (req.body.username === 'admin' && req.body.password === 'password') {
            res.send('Ta loggado.');
        } else {
            res.send('Usuario ou senha incorreto.');
        }

    } catch (error) {
        console.log(error); 
    }
});
*/


/*
POST / Admin - Pagina de Cadastro
*/
router.post('/cadastro', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user  = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'Crio usuario', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'Ja tem esse usuario' });
            }
            res.status(500).json({ message: 'Internal Server error'});
        }

    } catch (error) {
        console.log(error); 
    }
});


/*
DELETE / Admin - Deletar Post
*/
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }

});


/*
GET / Admin - Logout
*/
router.get('/logout', authMiddleware, async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

});


module.exports = router;