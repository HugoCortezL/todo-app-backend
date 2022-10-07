import userModel from '../models/User'
import {User, UserInput, UserLogin, List} from '../../graphql/types'

export class UserRepository {

    async create(item: UserInput): Promise<User> {
        const user = await userModel.create(item)
        return (user as unknown as User)
    }

    async login(item: UserLogin): Promise<User> {
        const promiseGetById = Promise.resolve(userModel.findOne({ email: item.email, password: item.password }))
        const user = await promiseGetById
        if(user){
            userModel.updateOne({ _id: user.id }, {
                $set: {
                    lastLogin: new Date().toString()
                }
            })
            return (user as unknown as User)
        }
        else{
            const noneUser: User = {
                id: "",
                email: "",
                name: "",
                password: "",
                lists: [],
                lastLogin: new Date().toString()
            }
            return noneUser
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