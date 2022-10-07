import mongoose from "mongoose";
import { User } from '../../graphql/types'
import listSchema from './List'


export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: String,
        required: false
    },
    lists: [
        {
            type: listSchema.schema,
            required: true
        }
    ]
})

export default mongoose.model<User>('User', userSchema)
