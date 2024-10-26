const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.js');
const port = 3000;

app.use(express.json());
app.use('/todos', todoRoutes);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index'); // Pastikan ada file index.ejs di dalam folder views
});

app.get('/contact', (req, res) => {
    res.render('contact'); // Pastikan ada file contact.ejs di dalam folder views
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
