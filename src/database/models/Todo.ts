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
    status: {
        type: String,
        enum: StatusEnum,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
})

export default mongoose.model<Todo>('Todo', todoSchema)