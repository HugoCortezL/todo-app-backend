import userModel from '../models/User'
import {User, UserInput, UserLogin, List, UserLoginResult} from '../../graphql/types'
import {v4} from 'uuid'
import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';

export class UserRepository {

    async create(item: UserInput): Promise<User> {
        const oldUserPromise = Promise.resolve(userModel.findOne({ email: item.email }))
        const oldUser = await oldUserPromise
        if (oldUser){
            return {
                id: "",
                name: "",
                email: "",
                password: "",
                token: "",
                lists: []
            }
        }
        const hashedPassword = await bcrypt.hash(item.password, 12)
        item = {...item, password: hashedPassword}
        const user = await userModel.create(item)
        return (user as unknown as User)
    }

    async login(item: UserLogin): Promise<UserLoginResult> {
        const promiseGetById = Promise.resolve(userModel.findOne({ email: item.email }))
        const user = await promiseGetById
        if(user){
            const isEqual = await bcrypt.compare(item.password, user.password)
            if(isEqual){
                const token = v4()
                const updateUserPromise = Promise.resolve(userModel.updateOne({ _id: user._id }, {
                    $set: {
                        token: token
                    }
                }))
                await updateUserPromise
                
                const userResult: UserLoginResult = {
                    name: user.name,
                    token: token
                }
                return userResult
            }
        }
        const noneUser: UserLoginResult = {
            name: "",
            token: ""
        }
        return noneUser
        
    }

    async getUserByToken(token: string): Promise<User>{
        const userByTokenPromise = Promise.resolve(userModel.findOne({ token: token }))
        const user = await userByTokenPromise
        if(user){
            return (user as unknown as User)
        }
        else{
            return {
                id: "",
                name: "",
                email: "",
                password: "",
                token: "",
                lists: []
            }
        }
    }

    async getById(id: string): Promise<User>{
        const promiseGetById = Promise.resolve(userModel.findOne({ _id: id }))
        const user = await promiseGetById
        return (user as unknown as User)
    }
    
    async getListsById(id: string): Promise<List[]>{
        const user = await this.getById(id)
        return (user.lists as unknown as List[])
    }
}