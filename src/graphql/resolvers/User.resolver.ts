import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { User, UserInput, UserLogin, List } from '../types'
import { UserRepository } from '../../database/repository'

@Resolver(() => User)
export class UserResolver {
    repository: UserRepository
    constructor() {
        this.repository = new UserRepository()
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

    @Query(() => [List],
        {
            description: "Login an user"
        }
    )
    async getListsById(
        @Arg("id",
            {
                description: "The id of the user"
            })
        id: string
    ): Promise<List[]> {
        const lists = await this.repository.getListsById(id)
        return lists
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
}