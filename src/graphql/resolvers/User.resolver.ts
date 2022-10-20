import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import { User, UserInput, UserLogin, List, UserLoginResult } from '../types'
import { UserRepository } from '../../database/repository'

@Resolver(() => User)
export class UserResolver {
    repository: UserRepository
    constructor() {
        this.repository = new UserRepository()
    }

    @Mutation(() => UserLoginResult,
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
    ): Promise<UserLoginResult> {
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
        if(id == ""){
            return []
        }
        const lists = await this.repository.getListsById(id)
        return lists
    }
    
    @Query(() => User,
        {
            description: "Get user by token"
        }
    )
    async getUserByToken(
        @Arg("token",
            {
                description: "The token of the user"
            })
        token: string
    ): Promise<User> {
        const user = await this.repository.getUserByToken(token)
        return user
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