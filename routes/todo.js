const express = require('express');
const router = express.Router();

let todos = [
    {
        id: 1, task: "Belajar Node.Js", completed: false
    },
    {
        id: 2, task: "Membuat API", completed: false
    },
];

let users = [
    {
        id: 1,
        name: "Dina",
        email: "dina@gmail.com",
        age: 21
    },
    {
        id: 2,
        name: "Amalia",
        email: "amalia@gmail.com",
        age: 20
    },
];

// Endpoint untuk mendapatkan data todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Route GET untuk mendapatkan semua users
router.get('/users', (req, res) => {
    res.json(users);
});

// Route untuk menambahkan todo
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Endpoint untuk memperbarui user berdasarkan ID
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, age } = req.body;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            name: name !== undefined ? name : users[userIndex].name,
            email: email !== undefined ? email : users[userIndex].email,
            age: age !== undefined ? age : users[userIndex].age
        };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE: Remove a user by ID
router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE: Remove a todo by ID
router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

module.exports = router;
