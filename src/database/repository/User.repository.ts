import userModel from '../models/User'
import {User, UserInput, UserLogin, List, UserLoginResult} from '../../graphql/types'
import {v4} from 'uuid'

export class UserRepository {

    async create(item: UserInput): Promise<User> {
        const user = await userModel.create(item)
        console.log(item)
        return (user as unknown as User)
    }

    async login(item: UserLogin): Promise<UserLoginResult> {
        const promiseGetById = Promise.resolve(userModel.findOne({ email: item.email, password: item.password }))
        const user = await promiseGetById
        if(user){
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
        else{
            const noneUser: UserLoginResult = {
                name: "",
                token: ""
            }
            return noneUser
        }
    }

    async getUserByToken(token: string): Promise<User>{
        const userByTokenPromise = Promise.resolve(userModel.findOne({ token: token }))
        const user = await userByTokenPromise
        console.log(user)
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