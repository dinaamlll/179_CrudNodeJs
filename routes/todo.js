const express = require('express');
const router = express.Router();

let todos = [
    { id: 1, task: "Belajar Node.Js", completed: false, description: "Belajar dasar Node.js", dueDate: "2024-10-30" },
    { id: 2, task: "Membuat API", completed: false, description: "Membuat API dengan Express", dueDate: "2024-11-05" },
    // Objek baru dengan 4 atribut
    { id: 3, task: "Belajar EJS", completed: false, description: "Mempelajari template EJS untuk rendering", dueDate: "2024-11-10" },
];

// Endpoint untuk mendapatkan semua todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Endpoint untuk menambahkan todo
router.post('/', (req, res) => {
    const { task, description, dueDate } = req.body;

    const newTodo = {
        id: todos.length + 1,
        task: task,
        completed: false,
        description: description,
        dueDate: dueDate
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Endpoint untuk mengupdate todo berdasarkan ID
router.put('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, completed, description, dueDate } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            task: task !== undefined ? task : todos[todoIndex].task,
            completed: completed !== undefined ? completed : todos[todoIndex].completed,
            description: description !== undefined ? description : todos[todoIndex].description,
            dueDate: dueDate !== undefined ? dueDate : todos[todoIndex].dueDate
        };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Endpoint untuk menghapus todo berdasarkan ID
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
