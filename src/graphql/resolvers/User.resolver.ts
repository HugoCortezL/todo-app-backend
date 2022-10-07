import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { User, UserInput, UserLogin } from '../types'
import { UserRepository } from '../../database/repository'

@Resolver(() => User)
export class UserResolver {
    repository: UserRepository
    constructor() {
        this.repository = new UserRepository()
    }

    @Mutation(() => User,
        {
            description: "Create an user"
        })
    async createUser(
        @Arg("user",
            {
                description: "The object of the user"
            })
        userInput: UserInput
    ): Promise<User> {
        const user = await this.repository.create(userInput)
        return user
    }

    @Query(() => User,
        {
            description: "Login an user"
        }
    )
    async loginUser(
        @Arg("user",
            {
                description: "The object of the user"
            })
        userLogin: UserLogin
    ): Promise<User> {
        const user = await this.repository.login(userLogin)
        return user
    }
}