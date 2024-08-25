import { Router } from "express";
import { createTodo, deleteTodo, getTodo, isTodoCompleted, updateTodo } from "../controllers/todo.controller.js";
import { tokenValidator } from "../middleware/tokenValidator.js";

const todoRoute = Router();

todoRoute.route("/todo").get(tokenValidator, getTodo).post(tokenValidator, createTodo);
todoRoute.route("/todo/:id").put(tokenValidator, updateTodo).delete(tokenValidator, deleteTodo)
todoRoute.route("/todo/:id/status").put(tokenValidator, isTodoCompleted)

export { todoRoute };
