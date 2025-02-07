import { connectToDB } from "../utils/connect.js"
import Todo from "../models/todoModel.js"
import { createError } from "../utils/error.js";


export async function getAllTodo(req, res, next) {
    await connectToDB();
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).send(todos);
}
export async function getTodo(req, res, next) {
    try {
        await connectToDB();
        const todo = await Todo.findById(req.params.id);
        console.log(todo);
        if (!todo) return next(createError(404, "Todo not found!"));
        if (todo.userId.toString() !== req.user.id) 
            return next(createError(404, "Not Authorized"));
        res.status(200).send(todo);
    } catch (e) {
        return next(createError(404, "Todo not found!"));
    }
}

export async function updateTodo(req, res, next) {
    const id = req.params.id;
    if (!req.body)
        return next(createError(404, "Missing fields!"));
    try {
        await connectToDB();
        const todo = await Todo.findById(id);
        if (todo.userId.toString() !== req.user.id)
            return next(createError(404, "Not authorized"));
        todo.title = req.body.title || todo.title;
        if (req.body.isCompleted !== undefined) {
            todo.isCompleted = req.body.isCompleted;
        }
        await todo.save();
        res.status(200).json({ message: "Todo updated!"});
    } catch (e) {
        return next(createError(404, "Todo not found"))
    }
}

export async function deleteTodo(req, res, next) {
    const id = req.params.id;
    try {
        await connectToDB();
        const todo = await Todo.deleteOne({
            _id: id,
            userId: req.user.id
        });
        if (!todo.deletedCount)
            return next(createError(404, "Todo not found!"));
        // await todo.save();
        res.status(200).json({ message: "Todo deleted!"});
    } catch (e) {
        return next(createError(404, "Todo not found"))
    }
}

export async function addTodo(req, res, next) {
    if (!req.body || !req.body.title) {
        return next(createError(404, "Title is required"));
    };
    await connectToDB();
    const newTodo = new Todo({ title: req.body.title, userId: req.user.id });
    await newTodo.save();
    res.status(201).json({newTodo, message: "successfully added todo" });

}