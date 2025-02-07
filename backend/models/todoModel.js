import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Todo must have an owner."],
    },
    title: {
        type:String,
        required: [true, "Must provide an tittle."],
    },
    isCompleted: {
        type:Boolean,
        default: false,
    },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;