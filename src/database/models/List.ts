import mongoose from "mongoose";
import { List } from "../../graphql/types";
import todoModel from './Todo'

const listSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    todos: [
        {
            type: todoModel.schema,
            required: true
        }
    ]
})

export default mongoose.model<List>('List', listSchema)
