import express from "express";
import { 
    getAllTodo, 
    getTodo, 
    deleteTodo, 
    updateTodo,
    addTodo 
} from "../controllers/todo.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllTodo);

router.post("/", verifyToken, addTodo);

router.get("/:id", verifyToken, getTodo);

router.put("/:id", verifyToken, updateTodo);

router.delete("/:id", verifyToken, deleteTodo);

export default router
