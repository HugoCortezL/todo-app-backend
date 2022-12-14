import mongoose from "mongoose";
import {Todo, PriorityEnum, StatusEnum} from '../../graphql/types'

const todoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: PriorityEnum,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: StatusEnum,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
})

export default mongoose.model<Todo>('Todo', todoSchema)