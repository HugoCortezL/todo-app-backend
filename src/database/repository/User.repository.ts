import userModel from '../models/User'
import {User, UserInput, UserLogin} from '../../graphql/types'

export class UserRepository {

    async create(item: UserInput): Promise<User> {
        const user = await userModel.create(item)
        return (user as unknown as User)
    }

    async login(item: UserLogin): Promise<User> {
        const promiseGetById = Promise.resolve(userModel.findOne({ email: item.email, password: item.password }))
        const user = await promiseGetById
        return (user as unknown as User)
    }

    

}