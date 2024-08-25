import { Todo } from "../models/todo.model.js"
import { apiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js" 

const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.find({user : req.user.id})
    if (!todo) {
        throw new apiError(404, "Todo Not found")
    }

    res.status(200).json(todo)
})

const createTodo = asyncHandler(async (req, res) => {
    const { todo, date } = req.body


    const isValidISODate = (dateString) => {
        const isoDateRegex = /^(\d{4}-\d{2}-\d{2})(T(\d{2}:\d{2}(:\d{2})?(.\d{1,3})?([+-]\d{2}:\d{2}|Z)?)?)?$/;
        return isoDateRegex.test(dateString);
    };

    if (
        [todo, date].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "all fields are required")
    }

    const dateFormatValid = isValidISODate(date)

    if (!dateFormatValid) {
        throw new apiError("401", "date must be in ISO format")
    }

    const todos = await Todo.create({
        todo,
        date,
        user : req.user.id
    })

    res.status(200).json(new ApiResponse(200, todos, "Todo created Successfully"))
}
)

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
        throw new apiError(404, "Todo Not found")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )

    res.status(200).json(new ApiResponse(200, updatedTodo, "Todo updated Successfully"))
}
)

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
        throw new apiError(404, "Todo Not found")
    }
    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json(new ApiResponse(200, {}, "Todo deleted Successfully"))
}
)

const isTodoCompleted = asyncHandler(async (req, res) => {
    const { isCompleted } = req.body
    const checkedTodo = await Todo.findById(req.params.id)
    if (!checkedTodo) {
        throw new apiError(404, "Todo Not found")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { ...req.body, isCompleted: isCompleted },
        {
            new: true
        }
    )

    res.status(200).json(new ApiResponse(200, updatedTodo, "Todo updated Successfully"))
}
)


export { createTodo, getTodo, updateTodo, deleteTodo, isTodoCompleted }