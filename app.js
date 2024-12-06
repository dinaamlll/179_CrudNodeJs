const express = require('express');
const app = express();
const todoRoutes = require('./routes/tododb.js');
const port = process.env.PORT;
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

// Middleware untuk static files
app.use(express.static('public')); 
// Halaman contact tanpa navbar
app.get('/contact', (req, res) => {
    res.render('contact', { noNavbar: true }); // Navbar tidak akan ditampilkan
  });
  

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET, // Gunakan secret key yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);
app.use(express.json());
app.use('/todos', todoRoutes);

app.set('view engine', 'ejs');

app.get('/', isAuthenticated, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layouts'
    });
});

app.get('/todo-view', (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layouts',
            todos: todos
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
