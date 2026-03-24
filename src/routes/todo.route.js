import express from 'express'
import Todo from '../models/todo.model'

const router = express.Router()

// GET /todos - Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.json(todos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST /todos - Create a new todo
router.post('/', async (req, res) => {
    try {
        const { title, description, completed } = req.body

        if (!title) {
            return res.status(400).json({ error: 'Title is required' })
        }

        const todo = new Todo({ title, description, completed: completed || false })

        const saveTodo = await todo.save()
        res.status(201).json(saveTodo)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET /todos/:id - Get a single todo by id
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /todos/:id - Update a single todo by id
router.put('/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const updateData = {
            updatedAt: Date.now()
        };

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (completed !== undefined) updateData.completed = completed;

        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /todos/:id - Delete a single todo by id
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router