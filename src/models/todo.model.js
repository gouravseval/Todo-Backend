import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const Todo = mongoose.model("Todo", todoSchema)